
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
import { signInWithEmailAndPassword } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { useFonts, Bangers_400Regular } from '@expo-google-fonts/bangers';
import AppLoading from "expo-app-loading";
import * as ScreenOrientation from 'expo-screen-orientation';
import RadioForm from 'react-native-simple-radio-button';

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

    async function changeScreenOrientation() {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
    }

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


    let [fontsLoaded] = useFonts({
        Bangers_400Regular
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }


    const handlerLogin = async () => {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
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
        setPassword("admin123e");
    };

    const onPressServiceHandler = () => {
        setEmail("service@gmail.com");
        setPassword("service");
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
            style={{
                flex: 1,
            }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={{

                }}>
                    <Text style={{

                        color: "#128a90",
                        fontSize: 90,
                        fontFamily: "Bangers_400Regular",
                        textAlign: "center",
                        marginTop: win.height * 0.1,
                    }}>
                        Bienvenido{"\n"}
                        <Text style={{
                            color: "#128a90",
                            fontSize: 30,
                            fontFamily: "Bangers_400Regular",
                        }}>
                            Por favor complete los datos para continuar {""}

                        </Text>
                    </Text>

                    <TextInput
                        style={{
                            marginTop: win.height * 0.1,
                            color: "#000000",
                            backgroundColor: "#dbece7",
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 20,
                            alignItems: "center",
                            height: 40,
                            marginBottom: 3,

                            borderColor: 'white',
                            borderWidth: 1,
                        }}
                        placeholder="Correo electrónico"
                        placeholderTextColor="#000000"
                        onChangeText={(email) => setEmail(email)}
                        value={email}

                    />

                    <TextInput
                        style={{
                            position: "relative",
                            color: "#000000",
                            backgroundColor: "#dbece7",
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 20,
                            alignItems: "center",
                            height: 40,
                            marginBottom: 3,

                            borderColor: 'white',
                            borderWidth: 1,
                        }}
                        placeholder="Contraseña"
                        placeholderTextColor="#000000"
                        onChangeText={(password) => setPassword(password)}
                        value={password}
                        secureTextEntry={true}
                    />



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

                    <Text style={{
                        color: "#128a90",
                        fontSize: 18,
                        textAlign: "center",
                        width: 90,
                        alignSelf: 'center',
                        paddingVertical: 4,
                        paddingHorizontal: -44,
                        textDecorationLine: 'underline'
                    }} onPress={functionCombined}>
                        Ingresar
                    </Text>

                    <View
                        style={{

                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 20,
                        }}
                    >
                        <Text style={{ color: "#128a90", }}>
                            No tiene una cuenta?{" "}
                        </Text>
                        <TouchableOpacity onPress={handlerSignUp}>
                            <Text
                                style={{

                                    color: "#128991",
                                    justifyContent: "flex-end",
                                    textDecorationLine: 'underline'
                                }}
                            >
                                {""}
                                Regístrese
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <View
                        style={{
                            position: "relative",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginLeft: win.width * 0.1,
                            marginRight: win.width * 0.1,
                        }}
                    >
                        <RadioForm
                            labelColor="#128a90"
                            buttonColor="#128a90"
                            radio_props={options}

                            onPress={(value) => {
                                SetUsers(value);
                            }} />
                            
                    </View>
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

        width: 70,
        height: 70,

    },
    message: {
        width: 60,
        height: 60,
        alignSelf: "center",
    },
    imageText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#8871ff",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'Bangers_400Regular',
    },
    fabLocation: {
        flex: 1,
        position: "absolute",
        bottom: -11,
    },
    fabLocationBR: {
        right: 20,
    },
    fabLocationTL: {
        left: 20,
        borderRadius: 50,

        backgroundColor: "#ffffff",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    fabLocationCenter: {
        alignSelf: "center",
    },
    inner: {
        padding: 24,

        justifyContent: "center",

    },
    header: {
        borderRadius: 20,
        color: "#000000",
        fontFamily: 'Bangers_400Regular',
        fontSize: 50,
        textAlign: "center",
    },
    subtitle: {
        color: "#8871ff",
        fontSize: 15,
        fontWeight: "100",
        textAlign: "center",
        borderRadius: 20,
    },
    input: {






    },
    btnContainer: {
    },
    logo: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: "contain",
    },
    ingresarText: {


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