import React, { useContext } from 'react';
import { View, Text, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Graph from '../components/Graph';
import { LinearGradient } from 'expo-linear-gradient';
import useSWR from 'swr';
import { AppContext } from '../Context';


function Plant(props) {
    const route = useRoute();
    const { plant } = route.params as { plant: plant };
    const { ip } = useContext(AppContext);

    const fetchData = async () => {
        const response = await fetch(`http://${ip}:3000/current_reading/${plant.device_id}`)
        const data = await response.json();
        return data;
    };

    const { data, error } = useSWR('myData', fetchData, {
        refreshInterval: 5000
    });

    if (!data) {
        return;
    }


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
                <Graph deviceID={plant.device_id} />
                <Text>Data: {data[0].reading}</Text>
            </ScrollView>
        </View>
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