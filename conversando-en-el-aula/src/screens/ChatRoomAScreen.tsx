import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Text, TouchableOpacity, } from 'react-native';
import { RootStackParamList } from '../../App';
import { auth, db } from "../database/firebase";
import styles from '../styles/Style';
import { FontAwesome } from '@expo/vector-icons';
import { Day, GiftedChat, InputToolbar  } from 'react-native-gifted-chat'
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons'; 

const ChatRoomAScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [messages, setMessages] = useState([]);

  

    useLayoutEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, "chatA"), orderBy("createdAt", "desc")), (snapshot =>
            setMessages(snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                text: doc.data().text,
                createdAt: doc.data().createdAt.toDate(),
                user: doc.data().user
            })))
        ))
        return unsubscribe;
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages))
        const {
            _id,
            createdAt,
            text,
            user } = messages[0]
        addDoc(collection(db, "chatA"), {
            _id,
            createdAt,
            text,
            user
        });
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            // headerRight: () => (
            //     <TouchableOpacity onPress={handlerSingOut}>
            //       <AntDesign name="closecircle" size={24} color="black" />
            //     </TouchableOpacity>
            // ),
            headerLeft: () => (
                <TouchableOpacity onPress={handlerBack}>
                   <AntDesign name="leftcircle" size={24} color="black" />
                </TouchableOpacity>
            ),
            headerTitle: () => (

                <Text style={styles.textUserA}>{auth?.currentUser?.displayName}</Text>
            ),
            headerTintColor: "#fff",
            headerTitleAlign: 'center',
            headerBackButtonMenuEnabled: false,
            headerStyle: {
                backgroundColor: '#2aade4',  
            }
        });
    }, []);

    async function handlerSingOut() {
        await auth
            .signOut()
            .then(() => { navigation.replace('Home') })
            .catch((error: any) => alert(error.message))
    }
    function handlerBack() {
        navigation.replace('Home');
    }
    
    return (

        <GiftedChat  
            messagesContainerStyle={{ backgroundColor: '#ffffff', borderColor: 'black', shadowColor: 'black' }}
            optionTintColor='#optionTintColor'
            messages={messages}
            onSend={messages => onSend(messages)}
            renderUsernameOnMessage={true}
            renderAvatarOnTop={true}
            maxInputLength={21}
            user={{
                _id: auth?.currentUser?.email || 1,
                name: auth?.currentUser?.displayName || '',
            }}
            textInputProps={{                      
                borderColor: 'black', 
                placeholder:"Escribe un mensaje aquí...",                    
                
            }}             
        />


    );
}

export default ChatRoomAScreen;


