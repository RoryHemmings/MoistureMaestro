import React from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Graph from '../components/Graph';
import { LinearGradient } from 'expo-linear-gradient';

function Plant(props) {
    const route = useRoute();

    const { plant } = route.params as { plant: plant };

    return (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView>
                <ImageBackground style={styles.header} resizeMode="cover" source={{ uri: plant.image }}>
                    <LinearGradient
                        colors={['transparent', 'rgba(11,11,13,0.4)']}
                        style={StyleSheet.absoluteFill}
                    />
                    <Text style={styles.mainHeading}>{plant.plant_name}</Text>
                </ImageBackground>
                <Graph deviceID={plant.device_id}/>
            </ScrollView>
        </View>
        // <SafeAreaView>
        //     <Text>Hello {deviceID}</Text>
        //     <Graph deviceID={deviceID}/>
        // </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 400,
        justifyContent: "flex-end",
        padding: 20,
    },
    mainHeading: {
        color: '#fff', 
        fontFamily: 'satoshi-b', 
        fontSize: 36, 
    }
});

export default Plant;