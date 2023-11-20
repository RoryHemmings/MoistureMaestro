import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [data, setData] = useState([])
  const getData = async  () => {
    console.log('hello'); 
    const r = await fetch('http://172.20.10.3:3000/all')
    const _data = await r.json(); 
    setData(_data);  
  }

  useEffect(() => {
    console.log(data); 
  }, [data])
  return (
    <View style={styles.container}>
      <Text onPress={getData}>Open up App.ts to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
