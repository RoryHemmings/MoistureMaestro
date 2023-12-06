import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import ValveController from './ValveController';
import { TouchableOpacity } from 'react-native-gesture-handler';

function AvailableValves(props) {
    const [duration, setTime] = useState<number>(15);

    const options = [
        {
            label: '15 sec',
            value: 15,
        },
        {
            label: '30 sec',
            value: 30,
        },
        {
            label: '1 min',
            value: 60,
        },
    ]
    return (
        <View style={styles.boxWithShadow}>
            <Text style={styles.headerText}>Available Irrigation Systems</Text>
            <View style={styles.timesWrapper}>
                {options.map(({ label, value }) => {
                    return (
                        <Pressable style={[styles.timeButton, { backgroundColor: duration == value ? '#d9f99d' : '#f5f5f5' }]} key={label} onPress={() => {
                            setTime(value); 
                        }}>
                            <Text style={styles.timeText}>
                                {label}
                            </Text>
                        </Pressable>
                    )
                })}
            </View>
            <ValveController sensorId={0} duration={duration} />
            <ValveController sensorId={1} duration={duration} />
        </View>
    );
}

const styles = StyleSheet.create({
    boxWithShadow: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        gap: 10,
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 10,
        borderCurve: 'continuous'
    },
    headerText: {
        fontFamily: "satoshi-b",
        lineHeight: 18,
        fontSize: 16,
        marginVertical: 5,
    },
    timesWrapper: {
        flexDirection: 'row',
        gap: 10
    },
    timeButton: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        borderCurve: 'continuous',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20
    },
    timeText: {
        fontFamily: 'satoshi-b',
        textAlign: 'center'
    }
})

export default AvailableValves;