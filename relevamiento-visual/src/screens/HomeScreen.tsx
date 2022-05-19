import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import React from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { auth } from "../database/firebase";
import styles from '../styles/Style';

const HomeScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    async function handlerSingOut() {
        await auth
            .signOut()
            .then(() => { navigation.replace('Login') })
            .catch((error: any) => alert(error.message))
    }

    const handlerCamera = (type: string) => {
        type === "like" ? navigation.replace('Like') : navigation.replace('Dislike');
    }

    return (
        <ImageBackground source={require('../assets/fondo.jpg')} style={{ flex: 1, }}>
            <View style={styles.container}>

                <View>
                    <Text style={{

                        width: '100%',
                        padding: 10,
                        borderRadius: 30,
                        fontSize: 20,
                        color: 'black',
                        fontWeight: 'bold',
                    }}>
                        Ver fotos de ...</Text>
                </View>

                <TouchableOpacity
                    onPress={() => handlerCamera("like")}
                    style={{
                        backgroundColor: '#ea6e0a',
                        width: '90%',
                        height: '35%',
                        padding: 5,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        source={require('../assets/cosaslindas.png')}
                        resizeMode="contain"
                        style={styles.logoHome}
                    />
                    <Text style={styles.buttonText}>Cosas Lindas</Text>
                </TouchableOpacity>



                <TouchableOpacity
                    onPress={() => handlerCamera("dislike")}

                    style={{
                        marginTop: 5,
                        backgroundColor: '#0a67ac',
                        width: '90%',
                        height: '35%',
                        padding: 5,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        source={require('../assets/cosasfeas.png')}
                        resizeMode="contain"
                        style={styles.logoHome}
                    />
                    <View>
                        <Text style={styles.buttonOutlineTextRole}>
                            Cosas Feas
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handlerSingOut}
                    // style={[styles.button, styles.buttonOutline]}>
                    style={{
                        marginTop: 5,
                        backgroundColor: "#f8acb0",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        height: 40,
                        borderColor: 'white',
                        borderWidth: 1,
                    }}>
                    <View>
                        <Text style={{
                            color: 'black',
                            fontWeight: '700',
                            fontSize: 16,
                        }}>

                            Cerrar sesión</Text>
                    </View>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    );
}

export default HomeScreen;
