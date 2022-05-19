import { ImageBackground, Text, TouchableOpacity, View,Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';



const HomeScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [flagUser, setFlagUser] = React.useState(false);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch((error: { message: any; }) => alert(error.message))
  }

  const createUser = () => {
    navigation.replace("LoadForm")
  }

  const loadUserList = () => {
    navigation.replace("LoadList")
  }

  useEffect(() => {
    if (auth.currentUser?.email != "admin@gmail.com")
      setFlagUser(true);
  }, [])


  return (
    <View style={styles.container}>
            <ImageBackground source={require("../assets/fondo.png")} style={{
                flex: 1,
                justifyContent: "center"
            }}>

        <View style={styles.exitSection}>
          <Text style={styles.exitText}>USUARIO: {auth.currentUser?.email}</Text>


          <TouchableOpacity style={styles.exitButton} onPress={handleSignOut}>
            <FontAwesomeIcon icon={faPowerOff} size={30} color="white" />
          </TouchableOpacity>
        </View>


        <View style={styles.body}>

          {flagUser ? (
            null
          ) : 
          
          
          
          
          // <TouchableOpacity onPress={createUser} style={styles.buttonLoadData}>
          //   <Text style={styles.buttonText}>CARGA DE USUARIO</Text>
          // </TouchableOpacity>
          
          
          <TouchableOpacity
          onPress={createUser}
          style={{
            backgroundColor: '#ea6e0a',
            width: '90%',
            height: '50%',
            padding: 5,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',   

            borderWidth: 1,
            borderColor: 'red',
          }}
        >
          <Image
            source={require('../assets/upload.png')}
            resizeMode="contain"
            style={{
              width: '100%',
              height: '80%',        
              margin: '3%',
            }}
          />
          <Text style={styles.buttonText}>CARGA DE USUARIO</Text>
        </TouchableOpacity>
          
          
          
          
          
          }

          <TouchableOpacity
       onPress={loadUserList}
          style={{
            marginTop: 10,
            backgroundColor: '#0d6aab',
            width: '90%',
            height: '50%',
            padding: 5,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',   

         
          }}
        >
          <Image
            source={require('../assets/userlist.png')}
            resizeMode="contain"
            style={{
              width: '100%',
              height: '80%',        
              margin: '3%',
            }}
          />
          <Text style={styles.buttonText}>VER LISTADO DE USUARIOS</Text>
        </TouchableOpacity>





        </View>
      </ImageBackground>
    </View>
  );
}

export default HomeScreen

import { StyleSheet } from 'react-native'
import { auth } from '../database/firebase';
import { RootStackParamList } from '../../App';

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  body: {
    marginTop: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginBottom: 300,
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    margin: 5,
    width: '30%',
    padding: 15,
    borderRadius: 25,
    borderWidth: 2,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,

  },
  exitSection: {
    width: '90%',
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: '25%',
  },
  exitText: {
    color: 'black',
    fontSize: 15,

    marginLeft: 10,
  },
  exitButton: {
    backgroundColor: 'transparent',
    borderColor: 'black',
    margin: 5,
    width: '30%',
    padding: 15,
    borderRadius: 25,
    borderWidth: 2,
    marginLeft: 35,
    alignItems: 'center',
    justifyContent: "center",
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  faIcon: {
    color: 'black',
  },
  buttonLoadData: {
    backgroundColor: ' rgba(131, 133, 140, 0.8);',
    borderLeftColor: '#05153F',
    borderLeftWidth: 10,
    borderRadius: 10,
    margin: 5,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
  },
  buttonList: {
    backgroundColor: ' rgba(168, 229, 128, 0.8);',
    borderLeftColor: '#F2C335',
    borderLeftWidth: 10,
    borderRadius: 10,
    marginTop: 10,
    margin: 5,
    padding: 15,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});



