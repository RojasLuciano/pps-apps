import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { RootStackParamList } from '../../App';
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
    function handlerRoomA() {
        navigation.replace('ChatA');
    }
    function handlerRoomB() {
        navigation.replace('ChatB');
    }

    return (
        <View style={styles.container}> 
            <View style={styles.buttonContainer} > 

                <TouchableOpacity
                    onPress={handlerRoomA}
                    style={{
                        backgroundColor: '#2aade4',
                        width: '100%',
                        height: '45%',
                        padding: 5,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',  
                        borderColor: 'black',     
                        borderWidth: 2, 
                        marginTop: 5, 
                    }}
                >
                    <Image
                        source={require('../assets/4a.png')}
                        resizeMode="contain"
                        style={styles.logoHome}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handlerRoomB}
                    style={{
                        backgroundColor: '#557be2',
                        width: '100%',
                        height: '45%',
                        padding: 5,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',  
                        borderColor: 'black',     
                        borderWidth: 2, 
                        marginTop: 5, 
                    }}

                >
                    <Image
                        source={require('../assets/4b.png')}
                        resizeMode="contain"
                        style={styles.logoHome}
                    />
                </TouchableOpacity>







                <TouchableOpacity
                    onPress={handlerSingOut}
                    style={{
                        backgroundColor: 'black',
                        width: '100%',
                        padding: 10,
                        borderRadius: 8,
                        alignItems: 'center',
                        marginTop: 5, 
                    }}>
                    <View>
                        <Text style={styles.buttonOutlineText}>
                            Cerrar Sesión</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HomeScreen;
