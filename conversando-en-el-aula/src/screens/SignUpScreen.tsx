import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Dimensions } from "react-native";
import { auth } from "../database/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";
import styles from "../styles/Style";

const SignScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const win = Dimensions.get('window');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace('Home');
            }
        })
        return unsubscribe;
    }, []);

    const handlerSingUp = async () => {
        if (displayName === "" || email === "" || password === "" || rePassword === "") {
            setMessageError("Todos los campos son obligatorios");
        } else if (password === rePassword) {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential: { user: any; }) => {
                    userCredential.user
                })
                .catch(error => {
                    switch (error.code) {
                        case 'auth/invalid-email':
                            setMessageError("Correo inválido");
                            break;
                        case 'auth/email-already-in-use':
                            setMessageError("Correo ya registrado");
                            break;
                        case 'auth/missing-email':
                            setMessageError("Correo no ingresado");
                            break;
                        case 'auth/internal-error':
                            setMessageError("Ingrese contraseña");
                            break;
                        default:
                            setMessageError(error.message)
                            break;
                    }
                }).finally(() => { setLoading(false) });
        } else {
            setMessageError("Las contraseñas no coinciden");
        }
        await updateProfile(auth.currentUser!, { displayName: displayName }).catch(
            (err) => console.log(err));
    }

    const handlerBack = () => {
        navigation.replace('Login');
    }

    const setMessageError = (message: string) => {
        setMessage(message);
        setTimeout(() => {
            setMessage("");
        }, 3000); 
    }

    return (
        <View style={{
            flex: 1,
        }}>
            {loading && <View style={{
                        position: 'absolute',
                        display: 'flex',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        top: 0,
                        height: '100%',
                        width: '100%',
                        zIndex: 100,
            }}>
                    <Spinner
                        visible={loading}  
                        textStyle={styles.spinnerTextStyle}
                    />
                </View>}
            <Image
                source={require('../assets/icon2.png')}
                resizeMode="contain"
                style={styles.logoHome}
            />

            <View style={{
                   width: '100%',
                   marginTop: 10,
            }}>
                {!!message ? <TouchableOpacity
                    style={styles.buttonError}
                    onPress={() => setMessage("")}
                >
                    <Text style={styles.buttonText}>{message}</Text>
                </TouchableOpacity> : null}

                <TextInput placeholder="Nombre"
                    value={displayName}
                    onChangeText={text => setDisplayName(text)}
                    style={{
                        color: "#000000",
                        backgroundColor: "#dbece7",
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        borderRadius: 20,
                        alignItems: "center",
                        height: 50,
                        marginTop: '5%',
                        borderColor: 'white',
                        borderWidth: 1,
                    }}
                />
                <TextInput placeholder="Correo electrónico"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={{
                        color: "#000000",
                        backgroundColor: "#dbece7",
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        borderRadius: 20,
                        alignItems: "center",
                        height: 50,
                        marginTop: '5%',
                        borderColor: 'white',
                        borderWidth: 1,
                    }}
                />

                <TextInput placeholder="Contraseña"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={{
                        color: "#000000",
                        backgroundColor: "#dbece7",
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        borderRadius: 20,
                        alignItems: "center",
                        height: 50,
                        marginTop: '5%',
                        borderColor: 'white',
                        borderWidth: 1,
                    }}
                    secureTextEntry
                />
                <TextInput placeholder="Vuelva a escribir la contraseña"
                    value={rePassword}
                    onChangeText={text => setRePassword(text)}
                    style={{
                        color: "#000000",
                        backgroundColor: "#dbece7",
                        paddingVertical: 10,
                        paddingHorizontal: 15,
                        borderRadius: 20,
                        alignItems: "center",
                        height: 50,
                        marginTop: '5%',
                        borderColor: 'white',
                        borderWidth: 1,
                    }}
                    secureTextEntry
                />
            </View>

            <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '5%',
            }} >
                <TouchableOpacity
                    onPress={handlerSingUp}
                    style={{
                        backgroundColor: 'black',
                        width: '80%',
                        padding: 5,
                        borderRadius: 8,
                        alignItems: 'center',
                        margin: '5%',
                        marginTop: 5,
                        borderColor: 'black',
                        borderWidth: 2,

                    }}
                >
                    <Text style={styles.buttonText}>Crear</Text>
                </TouchableOpacity>

                <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "black", }}>
                                Ya tiene una cuenta?{" "}
                            </Text>
                            <TouchableOpacity onPress={handlerBack}>
                                <Text
                                    style={{
                                        color: "black",
                                        justifyContent: "flex-end",
                                        textDecorationLine: 'underline',

                                    }}
                                >
                                    {""}
                                    Ingrese
                                </Text>
                            </TouchableOpacity>
                            </View>



            </View>
        </View>

    );
}

export default SignScreen