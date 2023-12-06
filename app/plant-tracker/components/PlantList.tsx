import { Text, FlatList, View, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState,} from 'react'
import { AppContext } from '../Context';
import { useNavigation, NavigationProp } from '@react-navigation/native';

export default function PlantList() {
    const { ip } = useContext(AppContext);
    const [plants, setPlants] = useState([])
    const navigation: NavigationProp<RootStackParamList>  = useNavigation();
    useEffect(() => {
        fetch(`http://${ip}:3000/plants`).then((res) => {
            res.json().then((data) => {
                setPlants(data);
            })
        })
    }, [])

    const Item = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {navigation.navigate('Plant', {plant: item})}} style={styles.item}>
                <Image
                    style={styles.image}
                    source={{
                        uri: item.image,
                    }}
                />
                <Text style={styles.label}>{item.plant_name}</Text>
            </TouchableOpacity>
        );
    }
    return (
        <View>
            <Text style={styles.headerText}>Your Plants</Text>
            <FlatList
                data={plants}
                renderItem={({ item }) => <Item item={item} />}
                horizontal
                contentContainerStyle={{alignItems: "stretch"}}
                ItemSeparatorComponent={() => <View style={{width: 20}} />}
                style={{ overflow: "visible", marginTop: 10, gap: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontFamily: "satoshi-b",
        lineHeight: 22,
        fontSize: 20,
        marginVertical: 5,
    },
    item: {
        width: 280,
    },
    label: {
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