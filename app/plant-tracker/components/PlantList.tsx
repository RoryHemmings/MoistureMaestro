import { Text, FlatList, View, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        gap: 20,
    },
    item: {
        margin: 10,
        padding: 10,
        fontSize: 18,
        borderRadius: 5, 
        height: 44,
        // backgroundColor: 'red',
    },
});

export default function PlantList() {
    const { ip } = useContext(AppContext);
    const [plants, setPlants] = useState([])
    useEffect(() => {
        fetch(`http://${ip}:3000/plants`).then((res) => {
            res.json().then((data) => {
                setPlants(data);
            })
        })
    }, [])
    return (
        <View style={styles.container}>
            <FlatList
                data={plants}
                renderItem={({ item }) => <Text style={styles.item}>{item.plant_name}</Text>}
            />
        </View>
    );
}
