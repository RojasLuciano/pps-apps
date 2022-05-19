
import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard,
    Platform,
    TouchableWithoutFeedback,
    ImageBackground,
    Dimensions,
} from "react-native";
import { auth } from "../database/firebase";

import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";
import AppLoading from "expo-app-loading";


import Modal from "react-native-modal";

const LoginScreen = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const win = Dimensions.get('window');
    const [chosenOption, setChosenOption] = React.useState('');



    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    const options = [
        { label: 'Admin', value: 'admin@gmail.com', pass: 'admin123e' },
        { label: 'Service', value: 'service@gmail.com', pass: 'service' },
        { label: 'User', value: 'user@gmail.com', pass: 'user123' },
    ];


    /**
     * Returns true if the screen is in portrait mode
     */
    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };


    const handlerLogin = async () => {
        setLoading(true);
        await auth.signInWithEmailAndPassword(email, password)
            .then((userCredential: { user: any }) => {
                const user = userCredential.user;
                console.log("Logged in with", user.email);
            })
            .then(() => {
                navigation.replace("Home");
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/invalid-email":
                    case "auth/user-not-found":
                    case "auth/wrong-password":
                    case "auth/internal-error":
                    case "auth/too-many-requests":
                        toggleModal();
                        setMessage("Credenciales inválidas");
                        break;
                    default:
                        setMessage(error.message);
                        break;
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const functionCombined = () => {
        handlerLogin();
        startLoading();
        setTimeout(() => {
            setModalVisible(false);
        }, 2000);
    };

    const onPressAdminHandler = () => {
        setEmail("admin@gmail.com");
        setPassword("admin123");
    };

    const onPressServiceHandler = () => {
        setEmail("service@gmail.com");
        setPassword("service123");
    };

    const onPressUserHandler = () => {
        setEmail("user@gmail.com");
        setPassword("user123");
    };

    const handlerSignUp = () => {
        navigation.replace("SignUp");
    };


    async function SetUsers( param: string     ) {
        switch (param) {
            case 'admin@gmail.com':
                onPressAdminHandler();
                break;
            case 'service@gmail.com':
                onPressServiceHandler();
                break;
            case 'user@gmail.com':
                onPressUserHandler();
                break;
            default:
                break;
        }
    }


    return (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inner}>
                <Text style={styles.header}>
                  Bienvenido{"\n"}
                  <Text style={styles.subtitle}>
                    Por favor complete los datos para continuar 
                  </Text>
                </Text>
    
                <TextInput
                  placeholder="Correo electrónico"
                  placeholderTextColor={"grey"}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={styles.input}
                  clearButtonMode="always"
                />
                <TextInput
                  placeholder="Contraseña"
                  placeholderTextColor={"grey"}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  style={styles.input}
                  secureTextEntry={true}
                />
    
                <View>
                  {loading && (
                    <View style={styles.spinContainer}>
                      <Spinner
                        visible={loading}
                        textStyle={styles.spinnerTextStyle}
                      />
                    </View>
                  )}
    
                  <View>
                    {!!isModalVisible ? (
                      <Modal isVisible={isModalVisible}>
                        <View style={styles.modalContainer}>
                          <Text style={styles.modalText}>{message}</Text>
                        </View>
                      </Modal>
                    ) : null}
                  </View>
    
                  <Text style={styles.ingresarText} onPress={functionCombined}>
                    Ingresar
                  </Text>
    
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#00060b",  }}>
                      No tiene una cuenta?{" "}
                    </Text>
                    <TouchableOpacity onPress={handlerSignUp}>
                      <Text
                        style={{
                        
                          color: "black",
                          textDecorationLine: "underline",
                          justifyContent: "flex-end",
                        }}
                      >
                        Regístrese
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
    
                <TouchableOpacity
                  style={[styles.fabLocation, styles.fabLocationCenter]}
                  onPress={onPressAdminHandler}
                  activeOpacity={0.5}
                >
                  <Image
                    style={styles.image}
                    source={require("../utils/img/user2.png")}
                  />
                  <View>
                    <Text style={styles.imageText}>Admin</Text>
                  </View>
                </TouchableOpacity>
    
                <TouchableOpacity
                  style={[styles.fabLocation, styles.fabLocationTL]}
                  onPress={onPressServiceHandler}
                  activeOpacity={0.5}
                >
                  <Image
                    style={styles.image}
                    source={require("../utils/img/user3.png")}
                  />
                  <View>
                    <Text style={styles.imageText}>Service</Text>
                  </View>
                </TouchableOpacity>
    
                <TouchableOpacity
                  style={[styles.fabLocation, styles.fabLocationBR]}
                  onPress={onPressUserHandler}
                  activeOpacity={0.5}
                >
                  <Image
                    style={styles.image}
                    source={require("../utils/img/user4.png")}
                  />
                  <View>
                    <Text style={styles.imageText}>User</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
    };
    
    export default LoginScreen;
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      image: {
        width: 77,
        height: 90,
      },
      imageText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#00060b",
        textAlign: "center",
        marginTop: -3,
        marginBottom: 10,
      },
      fabLocation: {
        position: "absolute",
        bottom: -11,
      },
      fabLocationBR: {
        right: 20,
      },
      fabLocationTL: {
        left: 20,
      },
      fabLocationCenter: {
        alignSelf: "center",
      },
      inner: {
        padding: 24,
        flex: 1,
        justifyContent: "center",
      },
      header: {
    
        fontSize: 50,
        fontWeight: "bold",
        color: "#00060b",
        textAlign: "center",
        marginBottom: 20,
    
        borderRadius: 50,
        padding : 10,
      },
      subtitle: {
        fontWeight: "bold",
        color: "#00060b",
        fontSize: 15,
        textAlign: "center",
      },
      input: {
       
        color: "black",
        borderBottomColor: "#000000",
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 10,
        fontSize: 18,
        fontWeight: "100",
      },
      btnContainer: {
        color: "#000000",
        fontWeight: "700",
        fontSize: 16,
      },
      logo: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: "contain",
      },
      ingresarText: {
        
        color: "#00060b",
        fontSize: 18,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10,
        textDecorationLine: "underline",
      },
      spinnerTextStyle: {
        color: "white",
      },
      spinContainer: {
        position: "absolute",
        display: "flex",
        backgroundColor: "rgba(255, 0, 0, 0)",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        height: "100%",
        width: "100%",
        zIndex: 100,
      },
      inputContainer: {
        width: "80%",
        marginTop: -70,
        marginBottom: 10,
        alignSelf: "center",
      },
      buttonError: {
        backgroundColor: "#b50404",
        width: "100%",
        padding: 15,
        borderRadius: 18,
        alignItems: "center",
      },
      buttonText: {
        color: "#000000",
        fontWeight: "700",
        fontSize: 16,
      },
      modalContainer: {
        backgroundColor: "#b50404",
        flex: 1,
    
        width: "60%",
        height: "10%",
        position: "absolute",
        borderRadius: 10,
    
        margin: "auto",
        textAlign: "center",
        alignSelf: "center",
      },
      modalText: {
        color: "white",
        fontWeight: "500",
        fontSize: 15,
        textAlign: "center",
        marginTop: 25,
        marginBottom: 10,
        alignSelf: "center",
      },
    });