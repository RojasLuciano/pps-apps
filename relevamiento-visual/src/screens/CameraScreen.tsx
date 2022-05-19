import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db, auth } from "../database/firebase";
import Spinner from "react-native-loading-spinner-overlay/lib";
import styles from "../styles/Style";
import { addDoc, collection } from "firebase/firestore";
import { Camera } from "expo-camera";
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

const CameraScreen = () => {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const [imageType, setImageType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const storage = getStorage();

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
    })();
  }, []);

  const getBlob = async (image: any) => {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    })
  };

  const dateComponentPad = (value: string) => {
    var format = value;
    return format.length < 2 ? '0' + format : format;
  }

  const formatDate = (date: any) => {
    let datePart = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(dateComponentPad);
    let timePart = [date.getHours(), date.getMinutes(), date.getSeconds()].map(dateComponentPad);
    return datePart.join('-') + ' ' + timePart.join(':');
  }

  const uploadImage = async (image: any, type: string) => {
    setLoading(true);
    const blob: any = await getBlob(image);
    const fileName = image.substring(image.lastIndexOf("/") + 1);
    const fileRef = ref(storage, "images/" + fileName);
    await uploadBytes(fileRef, blob);
    await addDoc(collection(db, "images"), {
      user: auth?.currentUser?.email,
      displayName: auth?.currentUser?.displayName,
      date: formatDate(new Date()),
      votes: [],
      type: type,
      creationDate: new Date(),
      image: fileRef.fullPath,
    });
    setMessageError("Imagen subida correctamente", false);
    await blob.close();
  };

  const setMessageError = (message: string, error: boolean) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  const handleCamera = async (type: string) => {
    setImageType(tp => type);
    setLoading(true);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 0.3,
    });
    if (!result.cancelled) {
      await uploadImage(result["uri"], type).then(() => { type === "nice" ? navigation.replace('Like') : navigation.replace('Dislike'); }).finally(() => { setLoading(false) });
      ;
    }
    setLoading(false)
  };

  const handlerBack = () => {
    navigation.replace('Home');
  }

  return (
    <ImageBackground source={require('../assets/fondo.jpg')} style={{ flex: 1, }}>
      {loading && <View style={styles.spinContainer}>
        <Spinner
          visible={loading}
          textStyle={styles.spinnerTextStyle}
        />
      </View>}
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
            Tomar foto de ...</Text>
        </View>


        <TouchableOpacity
          onPress={() => handleCamera("nice")}
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
          onPress={() => handleCamera("messy")}
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
          onPress={handlerBack}
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
                    }}
        >
          <Text style={{
                     color: 'black',
                     fontWeight: '700',
                     fontSize: 16,
          }}>Volver</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
export default CameraScreen

// import React, { useEffect, useState } from 'react';
// import { View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { getStorage, ref, uploadBytes } from "firebase/storage";
// import { db, auth } from "../database/firebase";
// import Spinner from "react-native-loading-spinner-overlay/lib";
// import styles from "../styles/Style";
// import { addDoc, collection } from "firebase/firestore";
// import { Camera } from "expo-camera";
// import { useNavigation } from '@react-navigation/core';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../../App';

// const CameraScreen = () => {
//   const [url, setUrl] = useState("");
//   const [message, setMessage] = useState("");

//   const [imageType, setImageType] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

//   const storage = getStorage();
  
//     useEffect(() => {
//       (async () => {
//         await Camera.requestCameraPermissionsAsync();
//       })();
//     }, []);

//   const getBlob = async (image: any) => {
//     return await new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.onload = function () {
//         resolve(xhr.response);
//       };
//       xhr.onerror = function (e) {
//         console.log(e);
//         reject(new TypeError("Network request failed"));
//       };
//       xhr.responseType = "blob";
//       xhr.open("GET", image, true);
//       xhr.send(null);
//     })
//   };

//   const dateComponentPad = (value: string) => {
//     var format = value;
//     return format.length < 2 ? '0' + format : format;
//   }

//   const formatDate = (date: any) => {
//     let datePart = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(dateComponentPad);
//     let timePart = [date.getHours(), date.getMinutes(), date.getSeconds()].map(dateComponentPad);
//     return datePart.join('-') + ' ' + timePart.join(':');
//   }

//   const uploadImage = async (image: any, type: string) => {
//     setLoading(true);
//     const blob: any = await getBlob(image);
//     const fileName = image.substring(image.lastIndexOf("/") + 1);
//     const fileRef = ref(storage, "images/" + fileName);
//     await uploadBytes(fileRef, blob);
//     await addDoc(collection(db, "images"), {
//       user: auth?.currentUser?.email,
//       displayName: auth?.currentUser?.displayName,
//       date: formatDate(new Date()),
//       votes: [],
//       type: type,
//       creationDate: new Date(),
//       image: fileRef.fullPath,
//     });
//     setMessageError("Imagen subida correctamente", false);
//     await blob.close();
//   };

//   const setMessageError = (message: string, error: boolean) => {
//     setMessage(message);
//     setTimeout(() => {
//       setMessage("");
//     }, 3000);
//   }

//   const handleCamera = async (type: string) => {
//     setImageType(tp => type);
//     setLoading(true);
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       aspect: [4, 3],
//       quality: 0.3,
//     });
//     if (!result.cancelled) {
//       await uploadImage(result["uri"], type).then(() => {type === "nice" ? navigation.replace('Like') : navigation.replace('Dislike');}).finally(() => { setLoading(false) });      
//       ;
//     }
//     setLoading(false)
//   };

//   const handlerBack = () => {
//     navigation.replace('Home');
// }

//   return (
//     <ImageBackground source={require('../assets/background.jpg')} resizeMode="repeat" style={styles.image}>
//           {loading && <View style={styles.spinContainer}>
//                     <Spinner
//                         visible={loading}
//                         textStyle={styles.spinnerTextStyle}
//                         />
//                 </View>}
//       <View style={styles.container}>
//         <View>
//           <Text style={styles.textHomeCamera}>
//             Seleccione la colección para la foto</Text>
//         </View>
//         <TouchableOpacity
//           onPress={() => handleCamera("nice")}
//           style={styles.buttonHomeCamera}
//         >

//           <Text style={styles.buttonText}>Cosas Lindas</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => handleCamera("messy")}
//           style={[styles.buttonHomeCamera, styles.buttonOutlineCamera]}

//         >

//           <View>
//             <Text style={styles.buttonOutlineTextRole}>
//               Cosas Feas
//             </Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity
//                         onPress={handlerBack}
//                         style={[styles.button, styles.buttonOutline]}
//                         >
//                         <Text style={styles.buttonOutlineText}>Volver</Text>
//                     </TouchableOpacity>
//       </View>
//     </ImageBackground>
//   );
// }
// export default CameraScreen
