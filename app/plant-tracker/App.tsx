import { StatusBar } from 'expo-status-bar';
import { createContext, useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Dimensions } from "react-native";
import { LineChart } from 'react-native-chart-kit';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import PlantList from './components/PlantList';
import { AppContext } from './Context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'satoshi': require('./assets/fonts/Satoshi-Variable.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
  return (
    <AppContext.Provider value={{ ip: "172.16.0.47" }}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        {/* <Text style={styles.headerText}>Good {greeting},{'\n'}{userDoc.fname}</Text> */}
        <PlantList />
      </SafeAreaView>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: "satoshi",
    lineHeight: 30,
    fontSize: 28,
  },
});
