import React, { useContext, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated, Easing } from 'react-native';
import { AppContext } from '../Context';



function ValveController({ sensorId }: { sensorId: number }) {
    const { ip } = useContext(AppContext)
    const [valveState, setValveState] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startAnimation = () => {
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 15000,
                easing: Easing.linear,
                useNativeDriver: false,
            }).start(() => {
                setValveState(false);
                animatedValue.setValue(0);
                changeValveState();
            });
        }
        if (valveState) {
            startAnimation();
        } else {
            animatedValue.setValue(0);
        }
    }, [animatedValue, valveState]);

    const width = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const changeValveState = async () => {
        await fetch(`http://${ip}:3000/${valveState ? 'close' : 'open'}`, {
            body: `{"valve_id": ${sensorId}}`,
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST"
        })
    }


    return (
        <TouchableOpacity
            onPress={async () => {
                await fetch(`http://${ip}:3000/${valveState ? 'close' : 'open'}`, {
                    body: `{"valve_id": ${sensorId}}`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST"
                })
                setValveState(!valveState);
            }}
            style={styles.button}
        >
            <Animated.View style={{ ...styles.progress, width }} />
            <View style={styles.contents}>
                <Text style={styles.text}>{valveState ? 'Watering' : 'Start Watering'} System {sensorId}</Text>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    button: {
        fontFamily: 'satoshi-m',
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        borderCurve: 'continuous',
        position: 'relative',
        overflow: 'hidden'
    },
    progress: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#00d2ff'
    },
    contents: {
        padding: 10,
    },
    text: {
        fontFamily: 'satoshi-m', 
        textAlign: 'center'
    }

});

export default ValveController;