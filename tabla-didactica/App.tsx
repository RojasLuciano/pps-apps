import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import AnimatedLottieView from 'lottie-react-native';
import { StyleSheet,Image, View, Text } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts,   
  Caveat_400Regular,
  Caveat_500Medium,
  Caveat_600SemiBold,
  Caveat_700Bold } from '@expo-google-fonts/caveat';
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
  const [fontsLoaded] = useFonts({
    Caveat_400Regular
    });

  const [lottieLoad, setLottieLoad] = React.useState(false);
  const [appIsReady, setAppIsReady] = React.useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(()=>{
    if(appIsReady){
      (async ()=>{
        await SplashScreen.hideAsync();
        setTimeout(() => {
          setLottieLoad(true)
        }, 3000);
      })()
    }
  },[appIsReady])
  if(!fontsLoaded) return <Image style={{height:'100%', width:'100%'}} source={require('./assets/splash.png')} />;

  if(!lottieLoad){
    return (
      <View style={{position: 'absolute', flex:1, paddingVertical:55,
      height: '100%', backgroundColor:"#3490dc",
      width: '100%',
      justifyContent: 'space-around', alignItems:'center'}}>
        <AnimatedLottieView  style={{width:350}}
          autoPlay 
          source={require('./assets/splash.json')}
        />
      </View>)
  }

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#3490dc'
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
    backgroundColor: '#3490dc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


