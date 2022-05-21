import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground } from "react-native";
import { auth } from "../database/firebase";
import styles from "../styles/Style";
import { signInWithEmailAndPassword } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { useFonts, IndieFlower_400Regular } from '@expo-google-fonts/indie-flower';
import AppLoading from "expo-app-loading";

export let admin = false;

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    let [fontsLoaded] = useFonts({
        IndieFlower_400Regular,
      });

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const handlerLogin = async () => {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: { user: any; }) => {
                const user = userCredential.user;
                console.log("Logged in with", user.email);
                navigation.replace('Home');
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/invalid-email':
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                    case 'auth/internal-error':
                    case 'auth/too-many-requests':
                        setMessageError("Credenciales inválidas");
                        break;
                    default:
                        setMessageError(error.message);
                        break;
                }
            }).finally(() => { setLoading(false) });
    }

    const setMessageError = (message: string) => {
        setMessage(message);
        setTimeout(() => {
            setMessage("");
        }, 3000);
    }

    const guestLogin = () => {
        setEmail("user@gmail.com");
      
        setPassword("user123");
        admin = false;
    }

    const adminLogin = () => {
        setEmail("admin@gmail.com");
        setPassword("admin123");
        admin = true;
    }

    const supplierLogin = () => {
        setEmail("service@gmail.com");
        setPassword("service123");
        admin = false;
    }

    const handlerBack = () => {
        navigation.replace('Index');
    }

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
   

            <View style={styles.container}>
                {loading && <View style={styles.spinContainer}>
                    <Spinner
                        visible={loading}
                        textStyle={styles.spinnerTextStyle}
                    />
                </View>}
                <Image
                    source={require('../../assets/qr.png')}
                    resizeMode="contain"
                    style={styles.logoHome}
                />

                <View style={styles.inputContainer}>
                    {!!message ? <TouchableOpacity
                        style={styles.buttonError}
                        onPress={() => setMessage("")}
                    >
                        <Text style={styles.buttonText}>{message}</Text>
                    </TouchableOpacity> : null}

                    <TextInput placeholder="Correo electrónico"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={
                            styles.input
                        }
                    />

                    <TextInput placeholder="Contraseña"
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>

                <View style={styles.buttonContainer} >
                    <TouchableOpacity
                        onPress={handlerLogin}

                        style={styles.buttonLogin}
                    >
                        <Text style={styles.buttonText}>Ingresar</Text>
                    </TouchableOpacity>

                    <View
                    style={{
                        marginTop: 10,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#00060b",  }}>
                      No tiene una cuenta?{" "}
                    </Text>
                    <TouchableOpacity onPress={handlerBack}

                    >
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

                <View style={styles.buttonContainer} >
                    <TouchableOpacity
                        onPress={guestLogin}
                        style={[styles.buttonRole, styles.buttonOutlineRole]}
                    >
                        <Text style={styles.buttonOutlineTextRole}>Usuario</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={adminLogin}
                        style={[styles.buttonRole, styles.buttonOutlineRole]}
                    >
                        <Text style={styles.buttonOutlineTextRole}>Administrador</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={supplierLogin}
                        style={[styles.buttonRole, styles.buttonOutlineRole]}
                    >
                        <Text style={styles.buttonOutlineTextRole}>Service</Text>
                    </TouchableOpacity>
                </View>
            </View>

    );
}
export default LoginScreen