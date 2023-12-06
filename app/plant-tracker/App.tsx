import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { AppContext } from './Context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Screens/Home';
import Plant from './Screens/Plant';

const Stack = createStackNavigator<RootStackParamList>();

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

  return (
    <AppContext.Provider value={{ ip: "172.16.0.4" }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#FFFFFF' } }} >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Plant" component={Plant} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}

