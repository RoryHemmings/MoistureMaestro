import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import PlantList from './components/PlantList';
import { AppContext } from './Context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'satoshi-m': require('./assets/fonts/Satoshi-Medium.otf'),
    'satoshi-b': require('./assets/fonts/Satoshi-Bold.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  let hours = new Date().getHours();

  let greeting = "Morning";
  if (hours > 11 && hours < 18) {
    greeting = "Afternoon";
  } else if (hours > 17 && hours < 21) {
    greeting = "Evening";
  } else if (hours > 20 || hours < 4) {
    greeting = "Night";
  }

  return (
    <AppContext.Provider value={{ ip: "172.16.0.47" }}>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.headerText}>Good {greeting},{'\n'}Kalyan</Text>
        <PlantList />
      </SafeAreaView>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 40,
  },
  headerText: {
    fontFamily: "satoshi-b",
    lineHeight: 30,
    fontSize: 28,
  },
});
