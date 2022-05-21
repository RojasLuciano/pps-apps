import React, { useEffect }  from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import AnimatedLottieView from 'lottie-react-native';
import { StyleSheet, Text, View,Image } from 'react-native';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import LoadForm from './src/screens/LoadFormScreen';
import LoadList from './src/screens/LoadListScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import * as SplashScreen from 'expo-splash-screen';
import { LogBox } from 'react-native';
import { useFonts,   
  Caveat_400Regular,
  Caveat_500Medium,
  Caveat_600SemiBold,
  Caveat_700Bold } from '@expo-google-fonts/caveat';

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications

export type RootStackParamList = {
  Home: any;
  Login: any;
  LoadForm: any;
  LoadList: any;
  SignUp: any;

}




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
        }, 6000);
      }
      )()
    }
  },[appIsReady])
  if(!fontsLoaded) return <Image style={{height:'100%', width:'100%'}} source={require('./assets/splash.png')} />;

  if(!lottieLoad){
    return (
      <View style={{position: 'absolute', flex:1, paddingVertical:55,
      height: '100%', backgroundColor:"#3490dc",
      width: '100%',
      justifyContent: 'space-around', alignItems:'center'}}>
        <Text style={{fontSize:72, color:'white'}}>Nicolas Luciano Rojas</Text>
        <AnimatedLottieView  style={{width:350}}
          autoPlay 
          source={require('./assets/splash.json')}
        />
        <Text style={{fontSize:72,color:'white'}}>4ºA</Text>
      </View>)
  }

  return (
    <NavigationContainer>
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
    backgroundColor: '#438fe7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


