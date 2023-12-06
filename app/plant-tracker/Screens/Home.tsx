import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react'
import PlantList from '../components/PlantList';
import AvailableValves from '../components/AvailableValves';
import Snapshot from '../components/Snapshot';
import { ScrollView } from 'react-native-gesture-handler';


export default function Home() {
    let hours = new Date().getHours();

    let greeting = "Morning";
    if (hours > 11 && hours < 18) {
        greeting = "Afternoon";
    } else if (hours > 17 && hours < 21) {
        greeting = "Evening";
    } else if (hours > 20 || hours < 4) {
        greeting = "Night";
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <ScrollView style={styles.container} contentContainerStyle={{
                rowGap: 20
            }} >
                <Text style={styles.headerText}>Good {greeting},{'\n'}Kalyan</Text>
                {/* <Snapshot /> */}
                <AvailableValves />
                <PlantList />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 20,
        marginTop: 40,
    },
    container: {
        flex: 1,
        overflow: 'visible',
    },
    headerText: {
        fontFamily: "satoshi-b",
        lineHeight: 30,
        fontSize: 28,
    }
});

