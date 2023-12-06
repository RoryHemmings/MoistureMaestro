import { StyleSheet, View, Text } from 'react-native';
import React from 'react'

export default function Snapshot() {
    return (
        <View style={styles.boxWithShadow}>
            <Text style={styles.headerText}>Snapshot of your Indoor Garden</Text>
        </View>
    )
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
    }
})