import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ChatRoomAScreen from './src/screens/ChatRoomAScreen';
import ChatRoomBScreen from './src/screens/ChatRoomBScreen';
import AnimatedLottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
console.disableYellowBox = true;

export type RootStackParamList = {
  Home: any;
  Login: any;
  SignUp: any;
  ChatA: any;
  ChatB: any;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  const [lottieLoad, setLottieLoad] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLottieLoad(true)
    }, 4000);
  }, [])

  if (!lottieLoad) {
    return (
      <AnimatedLottieView duration={2000}
        autoPlay
        style={styles.splash}
        source={require('./assets/animation.json')}
      />)
  }

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'rgba(243,243,243,255)'
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen name="ChatA" component={ChatRoomAScreen} />
        <Stack.Screen name="ChatB" component={ChatRoomBScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splash: {
    backgroundColor: '#f3f3f3',

  },
});


