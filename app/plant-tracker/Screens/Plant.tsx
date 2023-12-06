import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Graph from '../components/Graph';

function Plant(props) {
    const route = useRoute();

    const { deviceID } = route.params as { deviceID: number };

    return (
        <SafeAreaView>
            <Text>Hello {deviceID}</Text>
            <Graph deviceID={deviceID}/>
        </SafeAreaView>
    );
}

export default Plant;