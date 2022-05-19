import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import AnimatedLottieView from 'lottie-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import LoadForm from './src/screens/LoadFormScreen';
import LoadList from './src/screens/LoadListScreen';
import SignUpScreen from './src/screens/SignUpScreen';

console.disableYellowBox = true;
export type RootStackParamList = {
  Home: any;
  Login: any;
  LoadForm: any;
  LoadList: any;
  SignUp: any;

}

const Stack = createNativeStackNavigator<RootStackParamList>();



export default function App() {


  const [lottieLoad, setLottieLoad] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLottieLoad(true)
    }, 6000);
  }, [])

  if (!lottieLoad) {
    return (
      <AnimatedLottieView duration={4000}
        autoPlay
        source={require('./assets/animation.json')}
      />)
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
      <Stack.Screen options =  {{ headerShown: false }}  name="LoadForm" component={LoadForm} />
        <Stack.Screen options =  {{ headerShown: true }}  name="LoadList" component={LoadList} />
    
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


