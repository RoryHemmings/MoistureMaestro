import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from "react-native";
import { LineChart } from 'react-native-chart-kit';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';

export default function App() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState<LineChartData>();
  const [showGraph, setShowGraph] = useState(false);
  const getData = async () => {
    const r = await fetch('http://172.20.10.3:3000/all')
    const _data = await r.json();
    setData(_data);
  }

  const screenWidth = Dimensions.get("window").width;

  function generateData(data: any[]) {
    // console.log(data); 
    if (data.length !== 0) {
      let _data: LineChartData  = {
        labels: data.map((d, i) => { return i.toString(); }),
        datasets: [
          {
            data: data.map((d) => { return d.reading })
          }
        ]
      }; 
      setChartData(_data); 
      setShowGraph(true); 
    }
  }

  useEffect(() => {
    generateData(data);
  }, [data]);


  return (
    <View style={styles.container}>
      <Text onPress={getData}>Open up App.ts to start working on your app!</Text>
      <StatusBar style="auto" />
      {showGraph && <LineChart
        data={chartData}
        width={screenWidth}
        height={256}
        verticalLabelRotation={30}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
      />}
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
