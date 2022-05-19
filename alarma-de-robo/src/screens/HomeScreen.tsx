import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, Vibration, View, Image, TextInput, ImageBackground, Dimensions } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Camera } from 'expo-camera';
import { Audio } from "expo-av";
import { auth } from '../database/firebase';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { showMessage } from 'react-native-flash-message';
import useKeyboard from './useKeyboard';
import Modal from "react-native-modal";

const audioPlayer = new Audio.Sound();

const HomeScreen = () => {
  const [cord, setData] = useState({ x: 0, y: 0, z: 0, });
  const [subscription, setSubscription] = useState<any>(null);
  const [position, setPosition] = useState('horizontal');
  const [sound, setSound] = useState<any>();
  const [flashMode, setFlashMode] = React.useState('off')
  const [modal, setModal] = useState(false);
  const user: string = auth.currentUser?.email || '';
  const [password, setPassword] = useState("");
  const [start, setStart] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const isKeyboardOpen = useKeyboard();
  const [flagImage, setFlagImage] = useState(true);
  let imageAlarm = flagImage ? require('../utils/img/bell_off.png') : require('../utils/img/bell_ON.png');
  const win = Dimensions.get('window');
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const _subscribe = () => {
    console.log('subscribe');
    setSubscription(
      Accelerometer.addListener(accelerometerData => {
        setData(accelerometerData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  // useEffect(() => {
  //   _subscribe();
  //   return () => _unsubscribe();
  // }, []);

  //iphone
  // useEffect(() => {
  //   const { x, y, z } = cord;
  //   if (x > 0.5 && x < 0.99) {
  //     setPosition('derecha');
  //   } else if (x < -0.5) {
  //     setPosition('izquierda');
  //   } else if (y < -0.3) {
  //     setPosition('vertical');
  //   } else if (z < -0.1) {
  //     setPosition('horizontal');
  //   }
  // }, [cord]);
  const toggleModal = () => {
    console.log('Modal is now ', isModalVisible);
    setModalVisible(!isModalVisible);
};

  //Android cord
  useEffect(() => {
    const { x, y, z } = cord;

    if (x < 1 && x > 0.90 && y < 0.05 && y > 0.01) {
      setPosition('derecha');
    } else if (x < -0.5) {
      setPosition('izquierda');
    } else if (x > -0.01 && x < 0.5 && y > 1 && y < 1.05 && z > 0.01 && z < 0.19) {
      setPosition('vertical');
    } else if (x < -0.00 && x > -0.05 && y > -0.05 && y < 0.05 && z > 0.05 && z < 2) {
      setPosition('horizontal');
    }
  }, [cord]);


  const handleStart = () => {
    setFlagImage(previousState => !previousState);
    if (!start) {
      setStart(true);
      _subscribe();
      setModal(true);
    } else {
      setStart(false);
      _unsubscribe();
      setModal(false);
    }
  }

  const handleEnd = async () => {
    await auth
      .signInWithEmailAndPassword(user, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        if (user) {
          setModal(false);
          setStart(false);
          handleClose();
          _unsubscribe();
          setFlagImage(previousState => !previousState);
          audioPlayer.pauseAsync();
          audioPlayer.unloadAsync();
        }
      })
      .catch(() => {
        console.log('error');
        toggleModal();
        setMessage("Contraseña inválida");
        setTimeout(() => {
          setModalVisible(false);
        }
          , 2000);
      });
      
  }

  const handleClose = () => {
    setModal(false);
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {

        navigation.replace("Login")
      })
      .catch((error: { message: any; }) => alert(error.message))
  }

  async function playSound(sound: any) {
    try {
      await audioPlayer.unloadAsync()
      await audioPlayer.loadAsync(sound);
      await audioPlayer.playAsync();
    } catch (err) {
      console.warn("Couldn't Play audio", err)
    }
  }


  useEffect(() => {
    if (subscription) {
      switch (position) {
        case 'horizontal':
          console.log('horizontal');
          Vibration.vibrate(5000);
          playSound(require('../utils/mp3/alarm2.mp3'));
          break;
        case 'izquierda':
          console.log('izquierda');
          playSound(require('../utils/mp3/sacalamanodeahicarajo.mp3'));
          break;
        case 'derecha':
          console.log('derecha');
          playSound(require('../utils/mp3/nogod.mp3'));
          break;
        case 'vertical':
          console.log('vertical');
          playSound(require('../utils/mp3/alarma1.mp3'));
          Camera.requestCameraPermissionsAsync();
          break;
      }
    }
  }, [position])
  const { x, y, z } = cord;


  const [setImageHeight, setImageHeightValue] = useState(0);
  const [setImageWidth, setImageWidthValue] = useState(0);
  const [setPadding, setPaddingValue] = useState(0);

  function setImageSize(text: any) {
    if (text === 'open') {
      console.log('open');
      setImageHeightValue(250);
      setImageWidthValue(300);
      setPaddingValue(0);
    }
    else {
      console.log('close');
      setImageHeightValue(260);
      setImageWidthValue(290);
      setPaddingValue(1);
    }
  }

  useEffect(() => {
    if (isKeyboardOpen) {
      setImageSize('open');
    } else {
      setImageSize('close');
    }
  }, [isKeyboardOpen])

  return (

    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      {isKeyboardOpen}
      {subscription && position === "vertical" && <Camera flashMode="torch" style={{ height: 1, width: 1 }}
      ></Camera>}
              <Text style={{
              position: "absolute",
              top: win.height / 30,
              left: win.width / 50,
              fontSize: 25,
              color: '#000000',
              fontWeight: "bold",
            }}>
              Usuario: {auth.currentUser?.email?.substring(0, auth.currentUser?.email?.indexOf('@'))}
            </Text> 

            <TouchableOpacity 
              style={{
                position: "absolute",
                top: win.height / 30,
                right: win.width / 50,
                backgroundColor: '#8e9eff',
                borderColor: '#A4C3B2',
                borderRadius: 30,
                borderWidth: 2,
                padding: 5,
              }}
              onPress={handleSignOut}
            >
              <Text>
                Cerrar Sesión
              </Text>
            </TouchableOpacity>

      <View style={{
      }}>
        <TouchableOpacity onPress={handleStart}
          style={{
            padding: setPadding,
            height: setImageHeight,
            width: setImageWidth,
          }}
        >
          <Image
            source={imageAlarm}
            style={{
              padding: setPadding,
              height: setImageHeight,
              width: setImageWidth,
              resizeMode: 'contain',
            }} />
        </TouchableOpacity>

        {modal ?
          (
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
            }} >
              <Text style={{
                fontSize: 18,
                color: '#00060b',
              }}>INGRESE SU CONTRASEÑA</Text>
              <View style={{
                backgroundColor: 'transparent',
                borderBottomColor: '#fddc65',
                borderBottomWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 15,
                paddingVertical: 10,
                marginTop: 5,
              }}>
                <TextInput
                  placeholder="Contraseña"
                  placeholderTextColor="grey"
                  style={{
                    fontSize: 18,
                    color: '#989898',
                  }}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                />
              </View>

              <View>
                    {!!isModalVisible ? (
                      <Modal isVisible={isModalVisible}>
                        <View style={{
                                  backgroundColor: "#b50404",
                                  flex: 1,
                                  width: "60%",
                                  height: "10%",
                                  position: "absolute",
                                  borderRadius: 10,
                                  margin: "auto",
                                  alignSelf: "center",
                        }}>
                          <Text style={{
                                    color: "white",
                                    fontWeight: "500",
                                    fontSize: 15,
                                    textAlign: "center",
                                    marginTop: 25,
                                    marginBottom: 10,
                                    alignSelf: "center",
                          }}>{message}</Text>
                        </View>
                      </Modal>
                    ) : null}
                  </View>



              <TouchableOpacity onPress={handleEnd}
                style={{
                  backgroundColor: '#8e9eff',
                  borderColor: '#A4C3B2',
                  borderRadius: 30,
                  marginTop: 20,
                  margin: 5,
                  width: 180,
                  height: 60,
                  padding: 15,
                  borderWidth: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{
                  color: '#fefeff',
                  fontSize: 16,
                }}>APAGAR ALARMA</Text>
              </TouchableOpacity>
            </View>
          ) :
          <Text style={styles.buttonText}>{"\n"}Presione la alarma para iniciar</Text>
        }
      </View>
    </View>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,


    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
    justifyContent: 'center'
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  body: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',

  },
  textUser: {
    fontSize: 20,
    color: '#1d1e3e',
    fontWeight: 'bold',
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
    color: 'black',
    fontSize: 20,
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  exitSection: {
    width: '90%',
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  exitText: {
    color: 'white',
    fontSize: 20,
  },
  exitButton: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    margin: 5,
    width: '25%',
    padding: 15,
    borderRadius: 25,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: "center",
  },
  buttonImageIcon: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    marginBottom: 100,
  },
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  faIcon: {
    color: 'white',
  },
  modalContainer: {
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  modalBody: {
    borderColor: 'white',
    borderWidth: 2,
    width: '100%',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'space-between',
  },
  modalText: {
    fontSize: 18,
    color: '#F0F2EF',
  },
  escapeButton: {
    backgroundColor: '#545454',
    width: '25%',
    padding: 15,
    borderColor: '#AFD5AA',
    borderWidth: 0,
    borderRadius: 25,
    alignItems: 'center',
  },
  input: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    backgroundColor: '#8e9eff',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#A4C3B2',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 5,
  },
  inputImage: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
    color: '#e72b58',
  },
  textInput: {
    color: '#000000',
    paddingLeft: 10,
    fontSize: 18,

  },
  buttonStyle: {
    backgroundColor: '#7f1620',
    borderColor: '#e72b58',
    marginTop: 60,
    margin: 5,
    width: 180,
    height: 60,
    padding: 15,
    borderRadius: 30,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});



