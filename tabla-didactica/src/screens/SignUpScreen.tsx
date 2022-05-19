import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Platform,
    TouchableWithoutFeedback,
    Dimensions,
} from "react-native";
import { auth } from "../database/firebase";
import {
    createUserWithEmailAndPassword,
} from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Modal from "react-native-modal";



const SignUpScreen = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [rePassword, setRePassword] = React.useState("");
    const [displayName, setDisplayName] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [isModalVisible2, setModalVisible2] = React.useState(false);

    const win = Dimensions.get('window');




    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const toggleModal2 = () => {
        setModalVisible2(!isModalVisible2);
    };

    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const functionCombined = () => {
        handlerSingUp();
        setTimeout(() => {
            setModalVisible(false);
        }, 2000);
    };

    const handlerSingUp = async () => {
        if (
            displayName === "" ||
            email === "" ||
            password === "" ||
            rePassword === ""
        ) {
            setMessage("Todos los campos son obligatorios");
            toggleModal();
        } else if (password === rePassword) {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential: { user: any }) => {
                    userCredential.user;
                })
                .then(() => {
                    toggleModal2();
                    startLoading();
                    setTimeout(() => {
                        navigation.replace("Login");
                    }, 2000);
                })
                .catch((error) => {
                    switch (error.code) {
                        case "auth/invalid-email":
                            toggleModal();
                            setMessage("Correo inválido");
                            break;
                        case "auth/email-already-in-use":
                            toggleModal();
                            setMessage("Correo ya registrado");
                            break;
                        case "auth/missing-email":
                            toggleModal();
                            setMessage("Correo no ingresado");
                            break;
                        case "auth/internal-error":
                            toggleModal();
                            setMessage("Ingrese contraseña");
                            break;
                        default:
                            setMessage(error.message);
                            break;
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setMessage("Las contraseñas no coinciden");
        }
    };

    const handlerBack = () => {
        navigation.replace("Login");
    };

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
                flex: 1,
            }}
        >

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{
                    padding: 24,
                    flex: 1,
                    justifyContent: "center",
                }}>

                    <Image
                        style={{
                            width: 60,
                            height: 60,
                            alignSelf: "center",
                        }}
                        source={require("../img/user.png")}
                    />


                    <Text style={{

                        fontSize: 50,
                        color: "#128a90",
                        textAlign: "center",
                    }}>
                        Bienvenido {"\n"}
                        <Text style={{
                            color: "#128a90",
                            fontSize: 15,
                            fontWeight: "100",
                            textAlign: "center",
                        }}>
                            Por favor complete los datos para continuar {"\n"}

                        </Text>
                    </Text>

                    <View>
                        {!!isModalVisible2 ? (
                            <Modal isVisible={isModalVisible2}>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: "#039105",
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
                                    }}>
                                        Usuario creado con exito.
                                    </Text>
                                </View>
                            </Modal>
                        ) : null}
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

                    <TextInput
                        placeholder="Nombre"
                        placeholderTextColor={"#c8c8ca"}
                        value={displayName}
                        onChangeText={(text) => setDisplayName(text)}
                        style={{
                            color: "#000000",
                            backgroundColor: "#dbece7",
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 20,
                            alignItems: "center",
                            height: 40,
                            marginBottom: 10,
                            borderColor: 'white',
                            borderWidth: 1,
                        }}
                    />
                    <TextInput
                        placeholder="Correo electrónico"
                        placeholderTextColor={"#c8c8ca"}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={{
                            color: "#000000",
                            backgroundColor: "#dbece7",
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 20,
                            alignItems: "center",
                            height: 40,
                            marginBottom: 10,
                            borderColor: 'white',
                            borderWidth: 1,
                        }}
                    />

                    <TextInput
                        placeholder="Contraseña"
                        placeholderTextColor={"#c8c8ca"}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        style={{
                            color: "#000000",
                            backgroundColor: "#dbece7",
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 20,
                            alignItems: "center",
                            height: 40,
                            marginBottom: 10,
                            borderColor: 'white',
                            borderWidth: 1,
                        }}
                        secureTextEntry
                    />
                    <TextInput
                        placeholder="Confirmar contraseña"
                        placeholderTextColor={"#c8c8ca"}
                        value={rePassword}
                        onChangeText={(text) => setRePassword(text)}
                        style={{
                            color: "#000000",
                            backgroundColor: "#dbece7",
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 20,
                            alignItems: "center",
                            height: 40,
                            marginBottom: 10,
                            borderColor: 'white',
                            borderWidth: 1,
                        }}
                        secureTextEntry
                    />

                    <View>
                        {loading && (
                            <View style={{
                                position: "absolute",
                                display: "flex",
                                backgroundColor: "rgba(255, 0, 0, 0)",
                                alignItems: "center",
                                justifyContent: "center",
                                top: 0,
                                height: "100%",
                                width: "100%",
                                zIndex: 100,
                            }}>
                                <Spinner
                                    visible={loading}
                                    textStyle={{
                                        color: "white",
                                    }}
                                />
                            </View>
                        )}

                        <Text style={{
                            color: "#128a90",
                            fontSize: 18,
                            textAlign: "center",
                            width: 120,
                            alignSelf: 'center',
                            paddingVertical: 4,
                            paddingHorizontal: -44,
                            textDecorationLine: 'underline',
                            borderRadius: 20,
                        }} onPress={functionCombined}>
                            Registrarse
                        </Text>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Text style={{ color: "#128a90", }}>
                                Ya tiene una cuenta?{" "}
                            </Text>
                            <TouchableOpacity onPress={handlerBack}>
                                <Text
                                    style={{
                                        color: "#128a90",
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
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    );
};

export default SignUpScreen;

