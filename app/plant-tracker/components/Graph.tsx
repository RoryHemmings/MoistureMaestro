import { Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import LineChart, { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { AppContext } from '../Context';

function formatAMPM(date: Date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export default function Graph({ deviceID }: { deviceID: number }) {
    const { ip } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState<LineChartData>();
    const [showGraph, setShowGraph] = useState(false);
    const getData = async () => {
        const r = await fetch(`http://${ip}:3000/device/${deviceID}`)
        const _data = await r.json();
        setData(_data);
    }

    const screenWidth = Dimensions.get("window").width;

    function generateData(data: any[]) {
        console.log(data.length);
        if (data.length !== 0) {
            let _data: LineChartData = {
                labels: data.map((d, i) => {
                    let date = new Date(d.timestamp);
                    // let label = `${date.getHours() % 12 || 12}:${date.getMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`
                    // console.log(d.timestamp, new Date(d.timestamp).getHours(), new Date(d.timestamp).getMinutes());
                    return formatAMPM(date);
                }),
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
        getData();
    }, []);

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
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "4",
                        strokeWidth: "1",
                        stroke: "#000"
                    }
                }}
                bezier
            />}
        </>

    )
}