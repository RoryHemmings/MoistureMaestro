import { View, Text, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import LineChart, { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { AppContext } from '../Context';

export default function Graph() {
    const { ip } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState<LineChartData>();
    const [showGraph, setShowGraph] = useState(false);
    const getData = async () => {
        const r = await fetch(`http://${ip}:3000/all`)
        const _data = await r.json();
        setData(_data);
    }

    const screenWidth = Dimensions.get("window").width;

    function generateData(data: any[]) {
        // console.log(data); 
        if (data.length !== 0) {
            let _data: LineChartData = {
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
        <>
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
        </>

    )
}