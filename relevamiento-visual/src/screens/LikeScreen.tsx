import React, { useCallback, useLayoutEffect, useState } from 'react'
import { useEffect } from 'react'
import { collection, doc, getDoc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore'
import { db, auth, storage } from "../database/firebase";
import { useFocusEffect } from '@react-navigation/native'
import { getDownloadURL, ref } from 'firebase/storage'
import Spinner from "react-native-loading-spinner-overlay/lib";
import { ScrollView } from 'react-native-gesture-handler'
import { Image, View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { format } from 'fecha'
import styles from "../styles/Style";
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

const NiceListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [votes, setVotes] = useState<any>([]);

  const [fetched, setFetched] = React.useState(false);

  useEffect(() => {
    const actualVotes = Object.values(votes);
  }, [votes])

  useEffect(() => {
    const ac = new AbortController();
    Promise.all([
      fetch('http://placekitten.com/1000/1000', { signal: ac.signal }),
      fetch('http://placekitten.com/2000/2000', { signal: ac.signal })
    ]).then(() => setFetched(true))
      .catch(ex => console.error(ex));
    return () => ac.abort(); // Abort both fetches on unmount
  }, []);

  async function handlerSingOut() {
    await auth
      .signOut()
      .then(() => { navigation.replace('Index') })
      .catch((error: any) => alert(error.message))
  }
  function handlerBack() {
    navigation.replace('Home');
  }

  function handlerCamera() {
    navigation.replace('Camera');
  }

  useFocusEffect(
    useCallback(() => {
      getDocuments();
    }, []))

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.buttonAccessCamera}>
          <TouchableOpacity style={styles.buttonCamera} onPress={handlerCamera}>
          <AntDesign name="camera" size={34} color="black" />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (

        <View style={styles.buttonAccessCamera}>
          <TouchableOpacity onPress={handlerBack}>
          <AntDesign name="leftcircle" size={27} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCamera} onPress={handlerBack}>
          </TouchableOpacity>

        </View>
      ),
      headerTitle: () => (
        <Text style={styles.textUser}>{auth?.currentUser?.displayName}</Text>
      ),
      headerTintColor: "#fff",
      headerTitleAlign: 'center',
      headerBackButtonMenuEnabled: false,
      headerStyle: {
        backgroundColor: '#ea6e0a',
      }
    });
  }, []);

  const getDocuments = async () => {
    setLoading(true);
    setData([]);
    try {
      const querySnapshot = await (await getDocs(query(collection(db, "images"), orderBy('date', 'desc'), orderBy('creationDate', 'desc'))));       
      
      querySnapshot.forEach(async (doc) => {
        if (doc.data().type === 'nice') {
          const res: any = { ...doc.data(), id: doc.id };
          const imageUrl = await getDownloadURL(ref(storage, res.image));
          const voted = res.votes.some((vote: any) => vote === auth?.currentUser?.email);
          let countLike = doc.data().votes.length;
          setData((arr: any) => [...arr, { ...res, id: doc.id, imageUrl: imageUrl, voted, countLike }].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)));
        }
      });
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const handleVote = async (id: string) => {
    try {
      const ref = doc(db, "images", id);
      const document = await getDoc(ref);
      const documentVotes = document.data()?.votes;
      const userVoted = documentVotes.find((email: any) => email === auth?.currentUser?.email);
      let newVotes;
      let countVote = document.data()?.votes.length;
      if (userVoted) {
        newVotes = documentVotes.filter((email: any) => email !== auth?.currentUser?.email);
        countVote--;
      } else {
        newVotes = [...documentVotes, auth?.currentUser?.email];
        countVote++;
      }
      setData((arr: any) => arr.map((item: any) => item.id === id ? { ...item, voted: !item.voted } : item));
      setData((arr: any) => arr.map((item: any) => item.id === id ? { ...item, countLike: countVote } : item));
      await updateDoc(ref, { votes: newVotes })
      //await getDocuments();      
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  return (

          <ImageBackground source={require('../assets/fondo.jpg')}  style={{flex:1,}}>
    <ScrollView>
        {loading && <View style={styles.spinContainer}>
        <Spinner
        visible={loading}
        textStyle={styles.spinnerTextStyle}
        />
        </View>}

        {data.map((item: { imageUrl: any; countLike: any; displayName: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; creationDate: { toDate: () => Date; }; votes: string | any[]; voted: any; id: string; }) => (
          <View style={{ backgroundColor: '#ea6e0a', height: 300, width: '95%', margin: 10 }}>
            <Image resizeMode='cover' style={{ flex: 1 }} source={{ uri: item.imageUrl }} />
            <View style={{ padding: 10, justifyContent: 'space-between', height: 100 }}>
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.textUser}>{item.displayName}</Text>
                  {item.voted ?
                    <TouchableOpacity onPress={() => handleVote(item.id)}>
                      <AntDesign name={'heart'} size={30} color="red" /></TouchableOpacity> :
                    <TouchableOpacity onPress={() => handleVote(item.id)}>
                      <AntDesign name={'hearto'} size={30} color="red" /></TouchableOpacity>
                  }
                </View>
                <Text style={styles.textCard}>{item.countLike} Me gustas</Text>
                <Text style={styles.textCard}>{format(item.creationDate.toDate(), 'DD/MM/YYYY HH:mm')}hs</Text>
              </View>
            </View>
          </View>
        ))}




      </ScrollView>
    </ImageBackground>
  )
}

export default NiceListScreen