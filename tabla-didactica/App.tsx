import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import AnimatedLottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
console.disableYellowBox = true;
export type RootStackParamList = {
  Login: any;
  Home: any;
  SignUp: any;
  Photo: any;
  Grafico: any;

};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [lottieLoad, setLottieLoad] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLottieLoad(true)
    }, 1000);
  }, [])

  if (!lottieLoad) {
    return (
      <AnimatedLottieView duration={3000}
        autoPlay
        source={require('./assets/animation.json')}
      />)
  }
  
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'rgba(254,253,245,255)'
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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


