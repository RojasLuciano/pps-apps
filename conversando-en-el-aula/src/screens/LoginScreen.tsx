
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    Dimensions,
    Modal,
} from 'react-native';

// expo install expo-linear-gradient
import { LinearGradient } from 'expo-linear-gradient';

// npm i react-native-elements
import { Icon } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { RootStackParamList } from '../../App';
import { auth } from '../database/firebase';
import Spinner from 'react-native-loading-spinner-overlay/lib';

export default function LoginScreen5() {


    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [isModalVisible, setModalVisible] = React.useState(false);


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


    async function SetUsers(param: string) {
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
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <LinearGradient style={styles.container} colors={['#333', '#303030']}>

                <Image source={require('../../assets/icon2.png')} style={{
                    width: 100,
                    height: 100,
                    alignSelf: 'center',
                }} />

                {/* USUARIO */}
                <View style={styles.inputTopMorph}>
                    <View style={styles.inputBottomMorph}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={'#8c8c8c'}
                            placeholder={'Correo electrónico'}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            clearButtonMode="always"
                        />
                    </View>

                    {/* CONTRASEÑA */}
                    <View style={styles.inputBottomMorph}>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholderTextColor={'#8c8c8c'}
                            placeholder={'Contraseña'}
                            secureTextEntry={true}
                        />
                    </View>

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

                        <View>
                            {!!isModalVisible ? (
                                <Modal visible={isModalVisible}>
                                    <View style={{
                                        backgroundColor: "#b50404",
                                        width: "60%",
                                        height: 80,
                                        borderRadius: 10,
                                        marginTop: 250,

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
                    </View>
                </View>

        
                <TouchableOpacity
                    onPress={functionCombined}
                    style={styles.buttonOpacity}>
                    <View style={styles.buttonView}>
                        <Text style={styles.buttonText}>Ingresar</Text>
                    </View>
                </TouchableOpacity>

                <View
                    style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginTop: 20,
                    }}
                >
                    <Text style={{ color: "#fafafa", }}>
                        No tiene una cuenta?{" "}
                    </Text>
                    <TouchableOpacity
                        onPress={() => console.log('Pressed Registrese')}
                    >
                        <Text
                            style={{

                                color: "#fafafa",
                                justifyContent: "flex-end",
                                textDecorationLine: 'underline'
                            }}
                        >
                            {""}
                            Regístrese
                        </Text>
                    </TouchableOpacity>

                </View>
                {/* Social Login */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 40,
                    }}
                >
                    <TouchableOpacity
                        onPress={onPressAdminHandler}
                        style={styles.iconTouchable}>
                        <View style={styles.iconView}>
                            <Icon
                                name='user'
                                type='font-awesome'
                                color='#fafafa'
                            />
                            <Text style={{ color: 'white' }}>
                                Admin
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPressUserHandler}
                        style={styles.iconTouchable}>
                        <View style={styles.iconView}>
                            <Icon
                                name='user'
                                type='font-awesome'
                                color='#fafafa'
                            />
                            <Text style={{ color: 'white' }}>
                                Usuario
                            </Text>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onPressServiceHandler}

                        style={styles.iconTouchable}>
                        <View style={styles.iconView}>
                            <Icon
                                name='user'
                                type='font-awesome'
                                color='#fafafa'
                            />
                            <Text style={{ color: 'white' }}>
                                Service
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    inputTopMorph: {
        width: '100%',
        height: 100,
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#333',
        elevation: 5,
        shadowOffset: {
            width: -12,
            height: -12,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: '#252525',
    },
    inputBottomMorph: {
        backgroundColor: '#333',
        borderRadius: 10,
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: '#414141',
    },
    input: {
        width: '100%',
        height: 50,
        fontSize: 18,
        paddingHorizontal: 10,
        color: '#f1f3f6',
    },
    buttonOpacity: {
        width: '100%',
        height: 50,
        marginTop: 22,
        borderRadius: 10,
        backgroundColor: '#2e2e2e',
        elevation: 5,
        shadowOffset: {
            width: -6,
            height: -6,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: '#1d1d1d',
    },
    buttonView: {
        backgroundColor: '#2e2e2e',
        borderRadius: 10,
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: '#3f3f3f',
    },
    buttonText: {
        fontSize: 20,
        color: '#fafafa',
        marginVertical: 10,
        textAlign: 'center',
    },
    iconTouchable: {
        borderRadius: 10,
        backgroundColor: '#2e2e2e',
        elevation: 5,
        shadowOffset: {
            width: -6,
            height: -6,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: '#1d1d1d',
        marginHorizontal: 10,
    },
    iconView: {
        backgroundColor: '#2e2e2e',
        borderRadius: 10,
        shadowOffset: {
            width: 6,
            height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowColor: '#3f3f3f',
        padding: 14,
    },
});