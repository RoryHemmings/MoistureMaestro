import { Text, FlatList, View, Image, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context';

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

    const Item = ({ item }) => {
        return (
            <View>
                <Image
                    style={styles.image}
                    source={{
                        uri: item.image,
                    }}
                />
                <Text style={styles.item}>{item.plant_name}</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={plants}
                renderItem={({ item }) => <Item item={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        gap: 20,
        paddingVertical: 20,
    },
    item: {
        fontFamily: 'satoshi-m',
        fontWeight: '300',
        fontSize: 18,
        borderRadius: 5,
        height: 44,
    },
    image: {
        width: '100%', 
        height: 200, 
        borderRadius: 6, 
        marginBottom: 20
    }
});