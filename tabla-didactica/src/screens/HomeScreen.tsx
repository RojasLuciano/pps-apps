import React, { useEffect } from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { auth } from "../database/firebase";
import { Audio } from "expo-av";
import ActionButton from 'react-native-action-button';
import { useFonts, Bangers_400Regular } from "@expo-google-fonts/bangers";
import AppLoading from "expo-app-loading";
import I18n from "i18n-js";


const player = new Audio.Sound();

const HomeScreen = () => {
    const win = Dimensions.get("screen");
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [lottieLoad, setLottieLoad] = React.useState(false);
    const [language, setLanguage] = React.useState("es");
    const [topic, setTopic] = React.useState('colores');

    const [languageIcon, setLanguageIcon] = React.useState(require("../img/spain.png"));
    const [languageFlag, setLanguageFlag] = React.useState(1);

    var setItemsAtr = (language: number) => {
        setLanguageFlag(language);
        console.log(language);
    
        switch (language) {
          case 1:
            setLanguageIcon(require("../img/spain.png"));
            setLanguage("es")
            break;
          case 2:
            setLanguageIcon(require("../img/eeuu.png"));
            setLanguage("en")
            break;
          case 3:
            setLanguageIcon(require("../img/brazil.png"));
            setLanguage("por")
            break;
        }
      };


    const altura = win.height / 5;
    const ancho = win.width / 4;

    const altura_imagen = win.height / 6;
    const ancho_imagen = win.width / 5;

    const altura_vista_horizontal = win.height / 6;
    const ancho_vista_horizontal = win.width / 9;

    const altura_imagen_horizontal = win.height / 6;
    const ancho_imagen_horizontal = win.width / 8;

    const margen_horizontal = win.width / 40;

    const isPortrait = () => {
        const dim = Dimensions.get("screen");
        return dim.height >= dim.width;
    };
    const [orientation, setOrientation] = React.useState('');
    useEffect(() => {
        (async () => {
            setOrientation(isPortrait() ? 'portrait' : 'landscape');
            Dimensions.addEventListener('change', () => {
                setOrientation(isPortrait() ? 'portrait' : 'landscape');
            });
        }
        )();
    }, []);
    let [fontsLoaded] = useFonts({
        Bangers_400Regular,
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    I18n.translations = {
        en: {
            logout: 'Exit',

            portuges: 'PORTUGUESE',
            english: 'ENGLISH',
            spanish: 'SPANISH',

            colors: 'COLORS',
            red: 'RED',
            orange: 'ORANGE',
            yellow: 'YELLOW',
            green: 'GREEN',
            lightblue: 'LIGHTBLUE',
            blue: 'BLUE',
            purple: 'PURPLE',
            pink: 'PINK',
            grey: 'GREY',
            black: 'BLACK',

            numbers: 'NUMBERS',
            one: 'ONE',
            two: 'TWO',
            three: 'THREE',
            four: 'FOUR',
            five: 'FIVE',
            six: 'SIX',
            seven: 'SEVEN',
            eight: 'EIGHT',
            nine: 'NINE',
            ten: 'TEN',

            animals: 'ANIMALS',
            cebra: 'ZEBRA',
            lion: 'LION',
            rhino: 'RHINO',
            monkey: 'MONKEY',
            hippo: 'HIPPO',
            tucan: 'TOUCAN',
            giraffe: 'GIRAFFE',
            tiger: 'TIGER',
            fox: 'FOX',
            cow: 'COW',
        },

        es: {
            logout: 'Salir',

            portuges: 'PORTUGUES',
            english: 'INGLES',
            spanish: 'ESPAÑOL',

            colors: 'COLORES',
            red: 'ROJO',
            orange: 'NARANJA',
            yellow: 'AMARILLO',
            green: 'VERDE',
            lightblue: 'CELESTE',
            blue: 'AZUL',
            purple: 'PÚRPURA',
            pink: 'ROSA',
            grey: 'GRIS',
            black: 'NEGRO',

            numbers: 'NUMEROS',
            one: 'UNO',
            two: 'DOS',
            three: 'TRES',
            four: 'CUATRO',
            five: 'CINCO',
            six: 'SEIS',
            seven: 'SIETE',
            eight: 'OCHO',
            nine: 'NUEVE',
            ten: 'DIEZ',


            animals: 'ANIMALES',
            cebra: 'CEBRA',
            lion: 'LEON',
            rhino: 'RINOCERONTE',
            monkey: 'MONO',
            hippo: 'HIPOPOTAMO',
            tucan: 'TUCAN',
            giraffe: 'JIRAFA',
            tiger: 'TIGRE',
            fox: 'ZORRO',
            cow: 'VACA',
        },

        por: {
            logout: 'Sair',

            portuges: 'PORTUGUÊS',
            english: 'INGLÊS',
            spanish: 'ESPANHOL',

            colors: 'CORES',
            red: 'VERMELHO',
            orange: 'LARANJA',
            yellow: 'AMARELO',
            green: 'VERDE',
            lightblue: 'AZUL CLARO',
            blue: 'AZUL',
            purple: 'ROXA',
            pink: 'ROSA',
            grey: 'CINZA',
            black: 'PRETO',

            numbers: 'NÚMEROS',
            one: 'UM',
            two: 'DOIS',
            three: 'TRÉS',
            four: 'QUATRO',
            five: 'CINCO',
            six: 'SEIS',
            seven: 'SETE',
            eight: 'OITO',
            nine: 'NOVE',
            ten: 'DEZ',

            animals: 'ANIMAIS',
            cebra: 'ZEBRA',
            lion: 'LEÃO',
            rhino: 'RINOCERONTE',
            monkey: 'ARCO',
            hippo: 'HIPOPÓTAMO',
            tucan: 'TOUCÃO',
            giraffe: 'GIRAFA',
            tiger: 'TIGRE',
            fox: 'RAPOSA',
            cow: 'VACA',
        },
    };
    I18n.locale = language;
    async function handlerSingOut() {

        switch (language) {
            case "en":

                await player.loadAsync(require('../utils/mp3/es/salir/seeyousooon.mp3'));
                await player.playAsync();
                break;

            case "es":
                await player.loadAsync(require('../utils/mp3/es/salir/hastaluegojoseluis.mp3'));
                await player.playAsync();
                break;

            case "por":
                await player.loadAsync(require('../utils/mp3/es/salir/atelogo.mp3'));
                await player.playAsync();
                break;
        }

        auth
            .signOut()
            .then(() => {

                setLottieLoad(true);
            })
            .then(() => {
                setTimeout(() => {
                    player.unloadAsync();
                    navigation.replace("Login");
                }, 2000);

            })
            .catch((error: any) => alert(error.message));
    }
    async function PressSoundSwitch(sound: any) {
        switch (language) {
            case 'es':
                switch (topic) {
                    case 'colores':
                        switch (sound) {
                            case 'red':
                                await player.loadAsync(require('../utils/mp3/es/colores/rojo.mp3'));
                                await player.playAsync();
                                break;

                            case 'orange':
                                await player.loadAsync(require('../utils/mp3/es/colores/naranja.mp3'));
                                await player.playAsync();
                                break;

                            case 'yellow':
                                await player.loadAsync(require('../utils/mp3/es/colores/amarillo.mp3'));
                                await player.playAsync();
                                break;

                            case 'green':
                                await player.loadAsync(require('../utils/mp3/es/colores/verde.mp3'));
                                await player.playAsync();
                                break;


                            case 'lightblue':
                                await player.loadAsync(require('../utils/mp3/es/colores/celeste.mp3'));
                                await player.playAsync();
                                break;

                            case 'blue':
                                await player.loadAsync(require('../utils/mp3/es/colores/azul.mp3'));
                                await player.playAsync();
                                break;


                            case 'purple':
                                await player.loadAsync(require('../utils/mp3/es/colores/purpura.mp3'));
                                await player.playAsync();
                                break;

                            case 'pink':
                                await player.loadAsync(require('../utils/mp3/es/colores/rosa.mp3'));
                                await player.playAsync();
                                break;

                            case 'grey':
                                await player.loadAsync(require('../utils/mp3/es/colores/gris.mp3'));
                                await player.playAsync();
                                break;

                            case 'black':
                                await player.loadAsync(require('../utils/mp3/es/colores/negro.mp3'));
                                await player.playAsync();
                                break;
                        }
                        break;

                    case 'numeros':
                        switch (sound) {
                            case 'one':
                                await player.loadAsync(require('../utils/mp3/es/numeros/uno.mp3'));
                                await player.playAsync();
                                break;

                            case 'two':
                                await player.loadAsync(require('../utils/mp3/es/numeros/dos.mp3'));
                                await player.playAsync();
                                break;

                            case 'three':
                                await player.loadAsync(require('../utils/mp3/es/numeros/tres.mp3'));
                                await player.playAsync();
                                break;

                            case 'four':
                                await player.loadAsync(require('../utils/mp3/es/numeros/cuatro.mp3'));
                                await player.playAsync();
                                break;

                            case 'five':
                                await player.loadAsync(require('../utils/mp3/es/numeros/cinco.mp3'));
                                await player.playAsync();
                                break;

                            case 'six':
                                await player.loadAsync(require('../utils/mp3/es/numeros/seis.mp3'));
                                await player.playAsync();
                                break;

                            case 'seven':
                                await player.loadAsync(require('../utils/mp3/es/numeros/siete.mp3'));
                                await player.playAsync();
                                break;

                            case 'eight':
                                await player.loadAsync(require('../utils/mp3/es/numeros/ocho.mp3'));
                                await player.playAsync();
                                break;

                            case 'nine':
                                await player.loadAsync(require('../utils/mp3/es/numeros/nueve.mp3'));
                                await player.playAsync();
                                break;

                            case 'ten':
                                await player.loadAsync(require('../utils/mp3/es/numeros/diez.mp3'));
                                await player.playAsync();
                                break;
                        }

                        break;

                    case 'animales':
                        switch (sound) {
                            case 'cebra':
                                await player.loadAsync(require('../utils/mp3/es/animales/cebra.mp3'));
                                await player.playAsync();
                                break;

                            case 'lion':
                                await player.loadAsync(require('../utils/mp3/es/animales/leon.mp3'));
                                await player.playAsync();
                                break;

                            case 'rhino':
                                await player.loadAsync(require('../utils/mp3/es/animales/rinoceronte.mp3'));
                                await player.playAsync();
                                break;

                            case 'monkey':
                                await player.loadAsync(require('../utils/mp3/es/animales/mono.mp3'));
                                await player.playAsync();
                                break;

                            case 'hippo':
                                await player.loadAsync(require('../utils/mp3/es/animales/hipopotamo.mp3'));
                                await player.playAsync();
                                break;

                            case 'tucan':
                                await player.loadAsync(require('../utils/mp3/es/animales/tucan.mp3'));
                                await player.playAsync();
                                break;

                            case 'giraffe':
                                await player.loadAsync(require('../utils/mp3/es/animales/girafa.mp3'));
                                await player.playAsync();
                                break;

                            case 'tiger':
                                await player.loadAsync(require('../utils/mp3/es/animales/tigre.mp3'));
                                await player.playAsync();
                                break;

                            case 'fox':
                                await player.loadAsync(require('../utils/mp3/es/animales/zorro.mp3'));
                                await player.playAsync();
                                break;

                            case 'cow':
                                await player.loadAsync(require('../utils/mp3/es/animales/vaca.mp3'));
                                await player.playAsync();
                                break;
                        }

                        break;

                    default:
                        break;
                }
                break;
            case 'en':
                switch (topic) {
                    case 'colores':
                        switch (sound) {
                            case 'red':
                                
                                await player.loadAsync(require('../utils/mp3/en/colores/rojo.mp3'));
                                await player.playAsync();
                                break;

                            case 'orange':
                                await player.loadAsync(require('../utils/mp3/en/colores/naranja.mp3'));
                                await player.playAsync();
                                break;

                            case 'yellow':
                                await player.loadAsync(require('../utils/mp3/en/colores/amarillo.mp3'));
                                await player.playAsync();
                                break;

                            case 'green':
                                await player.loadAsync(require('../utils/mp3/en/colores/verde.mp3'));
                                await player.playAsync();
                                break;


                            case 'lightblue':
                                await player.loadAsync(require('../utils/mp3/en/colores/celeste.mp3'));
                                await player.playAsync();
                                break;

                            case 'blue':
                                await player.loadAsync(require('../utils/mp3/en/colores/azul.mp3'));
                                await player.playAsync();
                                break;


                            case 'purple':
                                await player.loadAsync(require('../utils/mp3/en/colores/violeta.mp3'));
                                await player.playAsync();
                                break;

                            case 'pink':
                                await player.loadAsync(require('../utils/mp3/en/colores/rosa.mp3'));
                                await player.playAsync();
                                break;

                            case 'grey':
                                await player.loadAsync(require('../utils/mp3/en/colores/gris.mp3'));
                                await player.playAsync();
                                break;

                            case 'black':
                                await player.loadAsync(require('../utils/mp3/en/colores/negro.mp3'));
                                await player.playAsync();
                                break;
                        }
                        break;

                    case 'numeros':
                        switch (sound) {
                            case 'one':
                                await player.loadAsync(require('../utils/mp3/en/numeros/uno.mp3'));
                                await player.playAsync();
                                break;

                            case 'two':
                                await player.loadAsync(require('../utils/mp3/en/numeros/dos.mp3'));
                                await player.playAsync();
                                break;

                            case 'three':
                                await player.loadAsync(require('../utils/mp3/en/numeros/tres.mp3'));
                                await player.playAsync();
                                break;

                            case 'four':
                                await player.loadAsync(require('../utils/mp3/en/numeros/cuatro.mp3'));
                                await player.playAsync();
                                break;

                            case 'five':
                                await player.loadAsync(require('../utils/mp3/en/numeros/cinco.mp3'));
                                await player.playAsync();
                                break;

                            case 'six':
                                await player.loadAsync(require('../utils/mp3/en/numeros/seis.mp3'));
                                await player.playAsync();
                                break;

                            case 'seven':
                                await player.loadAsync(require('../utils/mp3/en/numeros/sieste.mp3'));
                                await player.playAsync();
                                break;

                            case 'eight':
                                await player.loadAsync(require('../utils/mp3/en/numeros/ocho.mp3'));
                                await player.playAsync();
                                break;

                            case 'nine':
                                await player.loadAsync(require('../utils/mp3/en/numeros/nueve.mp3'));
                                await player.playAsync();
                                break;

                            case 'ten':
                                await player.loadAsync(require('../utils/mp3/en/numeros/diez.mp3'));
                                await player.playAsync();
                                break;
                        }

                        break;

                    case 'animales':
                        switch (sound) {
                            case 'cebra':
                                await player.loadAsync(require('../utils/mp3/en/animales/cebra.mp3'));
                                await player.playAsync();
                                break;

                            case 'lion':
                                await player.loadAsync(require('../utils/mp3/en/animales/leon.mp3'));
                                await player.playAsync();
                                break;

                            case 'rhino':
                                await player.loadAsync(require('../utils/mp3/en/animales/rinoceronte.mp3'));
                                await player.playAsync();
                                break;

                            case 'monkey':
                                await player.loadAsync(require('../utils/mp3/en/animales/mono.mp3'));
                                await player.playAsync();
                                break;

                            case 'hippo':
                                await player.loadAsync(require('../utils/mp3/en/animales/hipopotamo.mp3'));
                                await player.playAsync();
                                break;

                            case 'tucan':
                                await player.loadAsync(require('../utils/mp3/en/animales/tucan.mp3'));
                                await player.playAsync();
                                break;

                            case 'giraffe':
                                await player.loadAsync(require('../utils/mp3/en/animales/girafa.mp3'));
                                await player.playAsync();
                                break;

                            case 'tiger':
                                await player.loadAsync(require('../utils/mp3/en/animales/tigre.mp3'));
                                await player.playAsync();
                                break;

                            case 'fox':
                                await player.loadAsync(require('../utils/mp3/en/animales/zorro.mp3'));
                                await player.playAsync();
                                break;

                            case 'cow':
                                await player.loadAsync(require('../utils/mp3/en/animales/vaca.mp3'));
                                await player.playAsync();
                                break;
                        }

                        break;

                    default:
                        break;
                }
                break;

            case 'por':

                switch (topic) {
                    case 'colores':
                        switch (sound) {
                            case 'red':
                               
                                await player.loadAsync(require('../utils/mp3/por/colores/vermelho.mp3'));
                                await player.playAsync();
                                break;

                            case 'orange':
                                await player.loadAsync(require('../utils/mp3/por/colores/laranja.mp3'));
                                await player.playAsync();
                                break;

                            case 'yellow':
                                await player.loadAsync(require('../utils/mp3/por/colores/amarelo.mp3'));
                                await player.playAsync();
                                break;

                            case 'green':
                                await player.loadAsync(require('../utils/mp3/por/colores/verde.mp3'));
                                await player.playAsync();
                                break;


                            case 'lightblue':
                                await player.loadAsync(require('../utils/mp3/por/colores/celeste.mp3'));
                                await player.playAsync();
                                break;

                            case 'blue':
                                await player.loadAsync(require('../utils/mp3/por/colores/azul.mp3'));
                                await player.playAsync();
                                break;


                            case 'purple':
                                await player.loadAsync(require('../utils/mp3/por/colores/rosa.mp3'));
                                await player.playAsync();
                                break;

                            case 'pink':
                                await player.loadAsync(require('../utils/mp3/por/colores/rosarosa.mp3'));
                                await player.playAsync();
                                break;

                            case 'grey':
                                await player.loadAsync(require('../utils/mp3/por/colores/gris.mp3'));
                                await player.playAsync();
                                break;

                            case 'black':
                                await player.loadAsync(require('../utils/mp3/por/colores/negro.mp3'));
                                await player.playAsync();
                                break;
                        }
                        break;

                    case 'numeros':
                        switch (sound) {
                            case 'one':
                                await player.loadAsync(require('../utils/mp3/por/numeros/uno.mp3'));
                                await player.playAsync();
                                break;

                            case 'two':
                                await player.loadAsync(require('../utils/mp3/por/numeros/dos.mp3'));
                                await player.playAsync();
                                break;

                            case 'three':
                                await player.loadAsync(require('../utils/mp3/por/numeros/tres.mp3'));
                                await player.playAsync();
                                break;

                            case 'four':
                                await player.loadAsync(require('../utils/mp3/por/numeros/cuatro.mp3'));
                                await player.playAsync();
                                break;

                            case 'five':
                                await player.loadAsync(require('../utils/mp3/por/numeros/cinco.mp3'));
                                await player.playAsync();
                                break;

                            case 'six':
                                await player.loadAsync(require('../utils/mp3/por/numeros/seis.mp3'));
                                await player.playAsync();
                                break;

                            case 'seven':
                                await player.loadAsync(require('../utils/mp3/por/numeros/siete.mp3'));
                                await player.playAsync();
                                break;

                            case 'eight':
                                await player.loadAsync(require('../utils/mp3/por/numeros/ocho.mp3'));
                                await player.playAsync();
                                break;

                            case 'nine':
                                await player.loadAsync(require('../utils/mp3/por/numeros/nueve.mp3'));
                                await player.playAsync();
                                break;

                            case 'ten':
                                await player.loadAsync(require('../utils/mp3/por/numeros/diez.mp3'));
                                await player.playAsync();
                                break;
                        }

                        break;

                    case 'animales':
                        switch (sound) {
                            case 'cebra':
                                await player.loadAsync(require('../utils/mp3/por/animales/zebra.mp3'));
                                await player.playAsync();
                                break;

                            case 'lion':
                                await player.loadAsync(require('../utils/mp3/por/animales/leon.mp3'));
                                await player.playAsync();
                                break;

                            case 'rhino':
                                await player.loadAsync(require('../utils/mp3/por/animales/rinoceronte.mp3'));
                                await player.playAsync();
                                break;

                            case 'monkey':
                                await player.loadAsync(require('../utils/mp3/por/animales/mono.mp3'));
                                await player.playAsync();
                                break;

                            case 'hippo':
                                await player.loadAsync(require('../utils/mp3/por/animales/hipopotamo.mp3'));
                                await player.playAsync();
                                break;

                            case 'tucan':
                                await player.loadAsync(require('../utils/mp3/por/animales/tucan.mp3'));
                                await player.playAsync();
                                break;

                            case 'giraffe':
                                await player.loadAsync(require('../utils/mp3/por/animales/girafa.mp3'));
                                await player.playAsync();
                                break;

                            case 'tiger':
                                await player.loadAsync(require('../utils/mp3/por/animales/tigre.mp3'));
                                await player.playAsync();
                                break;

                            case 'fox':
                                await player.loadAsync(require('../utils/mp3/por/animales/zorro.mp3'));
                                await player.playAsync();
                                break;

                            case 'cow':
                                await player.loadAsync(require('../utils/mp3/por/animales/vaca.mp3'));
                                await player.playAsync();
                                break;
                        }
                        break;

                    default:
                        break;
                }
                break;
            default:
                break;
        }
        setTimeout(() => {
            player.unloadAsync();
        }
            , 1000);
    }
    return (
        <>
            {orientation === 'portrait' && // vertical
                <View style={{ flex: 1, }}
                >
                    <View 
                        style={{
                            left: win.width * 0.5,
                            top: win.height / 20,
                        }}
                    >
                        <TouchableOpacity // DESLOGUEAR
                            style={{
                                position: "relative",
                                backgroundColor: "#128991",
                                paddingVertical: 10,
                                paddingHorizontal: 40,
                                borderRadius: 20,
                                alignItems: "center",
                                width: "50%",
                            }}
                            onPress={handlerSingOut}
                            activeOpacity={0.5}
                        >
                            <Image
                                source={require('../img/logout.png')}
                                style={{
                                    width: 30,
                                    height: 30,
                                    marginRight: 10,
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View //Contenedor principal vertical
                        style={{

                            flexWrap: "wrap",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            marginTop: win.height / 20,

                        }}
                    >
                        {(() => {
                            if (topic == 'colores') {
                                return (
                                    <View //CONTENEDOR DE colores
                                        style={{
                                            // CONTENEDOR IDIOMAS
                                            flexWrap: "wrap",
                                            flexDirection: "row",
                                            justifyContent: "space-around",
                                            marginTop: win.height / 50,
                                            borderWidth: 1,
                                            borderColor: "rgba(255,255,255,0)",
                                        }}
                                    >
                                        <TouchableOpacity //ROJO
                                            onPress={() => PressSoundSwitch('red')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/colors/rojo.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity  //NARANJA
                                            onPress={() => PressSoundSwitch('orange')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/colors/naranja.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity  //yellow
                                            onPress={() => PressSoundSwitch('yellow')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/colors/amarillo.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity  //green
                                            onPress={() => PressSoundSwitch('green')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/colors/verde.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity  //celeste
                                            onPress={() => PressSoundSwitch('lightblue')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/colors/celeste.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity  //blue
                                            onPress={() => PressSoundSwitch('blue')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/colors/azul.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity  //violeta
                                            onPress={() => PressSoundSwitch('purple')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/colors/violeta.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity  //rosa
                                            onPress={() => PressSoundSwitch('pink')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/colors/rosa.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity  //gris
                                            onPress={() => PressSoundSwitch('grey')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/colors/gris.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity  //black
                                            onPress={() => PressSoundSwitch('black')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/colors/negro.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <ActionButton  //languages
                                            style={{
                                                marginBottom: win.width * 0.13,
                                            }}
                                            renderIcon={(active) =>
                                                <Image
                                                    //source={require("../img/languages.png")}
                                                    source={languageIcon}
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho,
                                                        height: altura,
                                                        alignSelf: "center",
                                                        borderRadius: 10,
                                                    }}
                                                />
                                            }
                                            verticalOrientation="up"
                                            position="left"
                                            spacing={67}
                                            hideShadow={true}
                                            buttonColor="rgba(0, 0, 0, 0.0)"
                                            useNativeFeedback={false}
                                            backdrop={false}
                                        >

                                            <ActionButton.Item >
                                                <TouchableOpacity
                                                    //onPress={() => setLanguage("es")}
                                                    onPress={() => setItemsAtr(1)}

                                                    style={{
                                                        width: ancho,
                                                        height: altura - 50,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen,
                                                            height: altura_imagen + 50,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/spain.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>

                                            <ActionButton.Item >
                                                <TouchableOpacity
                                                    //onPress={() => setLanguage("en")}
                                                    onPress={() => setItemsAtr(2)}
                                                    style={{
                                                        width: ancho,
                                                        height: altura - 50,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen,
                                                            height: altura_imagen + 50,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/eeuu.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>

                                            <ActionButton.Item >
                                                <TouchableOpacity
                                                //onPress={() => setLanguage("por")}
                                                onPress={() => setItemsAtr(3)}
                                                    style={{
                                                        width: ancho,
                                                        height: altura - 50,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen,
                                                            height: altura_imagen + 50,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/brazil.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>
                                        </ActionButton>

                                        <ActionButton  // topics
                                            style={{
                                                marginBottom: win.width * 0.13,
                                            }}
                                            renderIcon={(active) =>
                                                <Image
                                                    source={require("../img/topics.png")}
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho,
                                                        height: altura,
                                                        alignSelf: "center",
                                                        borderRadius: 10,
                                                    }}
                                                />
                                            }
                                            verticalOrientation="up"
                                            position="right"
                                            spacing={67}
                                            hideShadow={true}
                                            buttonColor="rgba(0, 0, 0, 0.0)"
                                            useNativeFeedback={false}
                                            backdrop={false}
                                        >
                                            <ActionButton.Item >

                                                <TouchableOpacity
                                                    onPress={() => setTopic("colores")}
                                                    style={{
                                                        width: ancho,
                                                        height: altura - 50,
                                                        alignSelf: "center",
                                                        borderRadius: 50,

                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen,
                                                            height: altura_imagen + 50,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/colors2.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>

                                            <ActionButton.Item >
                                                <TouchableOpacity
                                                    onPress={() => setTopic("numeros")}
                                                    style={{
                                                        width: ancho,
                                                        height: altura - 50,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen,
                                                            height: altura_imagen + 50,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/numbers.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>

                                            <ActionButton.Item  >
                                                <TouchableOpacity
                                                    onPress={() => setTopic("animales")}
                                                    style={{
                                                        width: ancho,
                                                        height: altura,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen + 10,
                                                            height: altura_imagen + 90,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/animals.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>
                                        </ActionButton>

                                    </View>


                                )
                            }
                            if (topic == 'numeros') {
                                return (
                                    <View //CONTENEDOR DE NUMEROS
                                        style={{
                                            // CONTENEDOR IDIOMAS
                                            flexWrap: "wrap",
                                            flexDirection: "row",
                                            justifyContent: "space-around",
                                            marginTop: win.height / 50,
                                            borderWidth: 1,
                                            borderColor: "rgba(255,255,255,0)",
                                        }}
                                    >
                                        <TouchableOpacity //uno
                                            onPress={() => PressSoundSwitch('one')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/numbers/uno.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity //dos
                                            onPress={() => PressSoundSwitch('two')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/numbers/dos.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity //tres
                                            onPress={() => PressSoundSwitch('three')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/numbers/tres.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity //cuatro
                                            onPress={() => PressSoundSwitch('four')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/numbers/cuatro.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity //cinco
                                            onPress={() => PressSoundSwitch('five')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/numbers/cinco.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity  //seis
                                            onPress={() => PressSoundSwitch('six')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/numbers/seis.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity //siete
                                            onPress={() => PressSoundSwitch('seven')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/numbers/siete.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity //ocho
                                            onPress={() => PressSoundSwitch('eight')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/numbers/ocho.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity //nueve
                                            onPress={() => PressSoundSwitch('nine')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/numbers/nueve.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity //diez
                                            onPress={() => PressSoundSwitch('ten')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/numbers/diez.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <ActionButton  //languages
                                            style={{
                                                marginBottom: win.width * 0.13,
                                            }}
                                            renderIcon={(active) =>
                                                <Image
                                                    //source={require("../img/languages.png")}
                                                    source={languageIcon}
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho,
                                                        height: altura,
                                                        alignSelf: "center",
                                                        borderRadius: 10,
                                                    }}
                                                />
                                            }
                                            verticalOrientation="up"
                                            position="left"
                                            spacing={67}
                                            hideShadow={true}
                                            buttonColor="rgba(0, 0, 0, 0.0)"
                                            useNativeFeedback={false}
                                            backdrop={false}
                                        >

                                            <ActionButton.Item >
                                                <TouchableOpacity
                                                    //onPress={() => setLanguage("es")}
                                                    onPress={() => setItemsAtr(1)}

                                                    style={{
                                                        width: ancho,
                                                        height: altura - 50,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen,
                                                            height: altura_imagen + 50,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/spain.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>

                                            <ActionButton.Item >
                                                <TouchableOpacity
                                                    //onPress={() => setLanguage("en")}
                                                    onPress={() => setItemsAtr(2)}
                                                    style={{
                                                        width: ancho,
                                                        height: altura - 50,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen,
                                                            height: altura_imagen + 50,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/eeuu.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>

                                            <ActionButton.Item >
                                                <TouchableOpacity
                                                //onPress={() => setLanguage("por")}
                                                onPress={() => setItemsAtr(3)}
                                                    style={{
                                                        width: ancho,
                                                        height: altura - 50,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen,
                                                            height: altura_imagen + 50,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/brazil.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>
                                        </ActionButton>

                                        <ActionButton  // topics
                                            style={{
                                                marginBottom: win.width * 0.13,
                                            }}
                                            renderIcon={(active) =>
                                                <Image
                                                    source={require("../img/topics.png")}
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho,
                                                        height: altura,
                                                        alignSelf: "center",
                                                        borderRadius: 10,
                                                    }}
                                                />
                                            }
                                            verticalOrientation="up"
                                            position="right"
                                            spacing={67}
                                            hideShadow={true}
                                            buttonColor="rgba(0, 0, 0, 0.0)"
                                            useNativeFeedback={false}
                                            backdrop={false}
                                        >
                                            <ActionButton.Item >

                                                <TouchableOpacity
                                                    onPress={() => setTopic("colores")}
                                                    style={{
                                                        width: ancho,
                                                        height: altura - 50,
                                                        alignSelf: "center",
                                                        borderRadius: 50,

                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen,
                                                            height: altura_imagen + 50,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/colors2.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>

                                            <ActionButton.Item >
                                                <TouchableOpacity
                                                    onPress={() => setTopic("numeros")}
                                                    style={{
                                                        width: ancho,
                                                        height: altura - 50,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen,
                                                            height: altura_imagen + 50,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/numbers.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>

                                            <ActionButton.Item  >
                                                <TouchableOpacity
                                                    onPress={() => setTopic("animales")}
                                                    style={{
                                                        width: ancho,
                                                        height: altura,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen + 10,
                                                            height: altura_imagen + 90,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/animals.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>
                                        </ActionButton>

                                    </View>
                                )
                            }
                            if (topic == 'animales') {
                                return (
                                    <View //CONTENEDOR DE animales
                                        style={{
                                            flexWrap: "wrap",
                                            flexDirection: "row",
                                            justifyContent: "space-around",
                                            marginTop: win.height / 50,
                                            borderWidth: 1,
                                            borderColor: "rgba(255,255,255,0)",
                                        }}
                                    >
                                        <TouchableOpacity //cebra
                                         onPress={() => PressSoundSwitch('cebra')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/animals/cebra.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity //LEON
                                        onPress={() => PressSoundSwitch('lion')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/animals/leon1.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity //RINOCERONTE
                                        onPress={() => PressSoundSwitch('rhino')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/animals/RINOCERONTE.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity //MONO
                                        onPress={() => PressSoundSwitch('monkey')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/animals/mono.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity //HIPOPOTAMO
                                        onPress={() => PressSoundSwitch('hippo')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/animals/hipopotamo1.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>
                                 
                                        <TouchableOpacity //TUCAN
                                        onPress={() => PressSoundSwitch('tucan')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/animals/tucan.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity // JIRAFA
                                        onPress={() => PressSoundSwitch('giraffe')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/animals/girafa.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity //TIGRE
                                        onPress={() => PressSoundSwitch('tiger')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/animals/tigre.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity //ZORRO
                                        onPress={() => PressSoundSwitch('fox')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/animals/zorro.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity //VACA
                                        onPress={() => PressSoundSwitch('cow')}
                                            style={{
                                                width: ancho,
                                                height: altura,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen,
                                                    height: altura_imagen,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                                source={require("../img/animals/vaca.png")}
                                            />

                                            <Text
                                                style={{
                                                    color: "#128991",
                                                    fontFamily: "Bangers_400Regular",
                                                    alignSelf: "center",
                                                    fontSize: 20,
                                                }}
                                            >
                                            </Text>
                                        </TouchableOpacity>

                                        <ActionButton  //languages
                                            style={{
                                                marginBottom: win.width * 0.13,
                                            }}
                                            renderIcon={(active) =>
                                                <Image
                                                    //source={require("../img/languages.png")}
                                                    source={languageIcon}
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho,
                                                        height: altura,
                                                        alignSelf: "center",
                                                        borderRadius: 10,
                                                    }}
                                                />
                                            }
                                            verticalOrientation="up"
                                            position="left"
                                            spacing={67}
                                            hideShadow={true}
                                            buttonColor="rgba(0, 0, 0, 0.0)"
                                            useNativeFeedback={false}
                                            backdrop={false}
                                        >

                                            <ActionButton.Item >
                                                <TouchableOpacity
                                                    //onPress={() => setLanguage("es")}
                                                    onPress={() => setItemsAtr(1)}

                                                    style={{
                                                        width: ancho,
                                                        height: altura - 50,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen,
                                                            height: altura_imagen + 50,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/spain.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>

                                            <ActionButton.Item >
                                                <TouchableOpacity
                                                    //onPress={() => setLanguage("en")}
                                                    onPress={() => setItemsAtr(2)}
                                                    style={{
                                                        width: ancho,
                                                        height: altura - 50,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen,
                                                            height: altura_imagen + 50,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/eeuu.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>

                                            <ActionButton.Item >
                                                <TouchableOpacity
                                                //onPress={() => setLanguage("por")}
                                                onPress={() => setItemsAtr(3)}
                                                    style={{
                                                        width: ancho,
                                                        height: altura - 50,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen,
                                                            height: altura_imagen + 50,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/brazil.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>
                                        </ActionButton>

                                        <ActionButton  // topics
                                            style={{
                                                marginBottom: win.width * 0.13,
                                            }}
                                            renderIcon={(active) =>
                                                <Image
                                                    source={require("../img/topics.png")}
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho,
                                                        height: altura,
                                                        alignSelf: "center",
                                                        borderRadius: 10,
                                                    }}
                                                />
                                            }
                                            verticalOrientation="up"
                                            position="right"
                                            spacing={67}
                                            hideShadow={true}
                                            buttonColor="rgba(0, 0, 0, 0.0)"
                                            useNativeFeedback={false}
                                            backdrop={false}
                                        >
                                            <ActionButton.Item >

                                                <TouchableOpacity
                                                    onPress={() => setTopic("colores")}
                                                    style={{
                                                        width: ancho,
                                                        height: altura - 50,
                                                        alignSelf: "center",
                                                        borderRadius: 50,

                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen,
                                                            height: altura_imagen + 50,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/colors2.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>

                                            <ActionButton.Item >
                                                <TouchableOpacity
                                                    onPress={() => setTopic("numeros")}
                                                    style={{
                                                        width: ancho,
                                                        height: altura - 50,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen,
                                                            height: altura_imagen + 50,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/numbers.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>

                                            <ActionButton.Item  >
                                                <TouchableOpacity
                                                    onPress={() => setTopic("animales")}
                                                    style={{
                                                        width: ancho,
                                                        height: altura,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                >
                                                    <Image
                                                        style={{
                                                            resizeMode: "contain",
                                                            width: ancho_imagen + 10,
                                                            height: altura_imagen + 90,
                                                            alignSelf: "center",
                                                            borderRadius: 50,
                                                        }}
                                                        source={require("../img/animals.png")}
                                                    />
                                                </TouchableOpacity>
                                            </ActionButton.Item>
                                        </ActionButton>
                                    </View>
                                )
                            }
                            return null;
                        })()}

                    </View>

                </View>
            }
            {orientation === 'landscape' && // horizontal
                <View style={{ flex: 1, }}
                >
                    <TouchableOpacity //DESLOGUEAR
                        style={{
                            
                            top: win.height / 20,
                            width: win.width * 0.2,
                            position: "relative",
                            backgroundColor: "#128991",
                            paddingVertical: 10,
                            paddingHorizontal: 45,
                            borderRadius: 20,
                            alignItems: "center",
                            alignSelf: "center",
                        }}
                        onPress={handlerSingOut}
                        activeOpacity={0.5}
                    >
                            <Image
                                source={require('../img/logout.png')}
                                style={{
                                    width: 30,
                                    height: 30,
                                    marginRight: 10,
                                }}
                            />
                    </TouchableOpacity>

                    {(() => {
                        if (topic == 'colores') {
                            return (
                                <View //CONTENEDOR DE COLORES
                                    style={{
                                        flexWrap: "wrap",
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        marginTop: win.height / 20,
                                        height: win.height / 1.2,
                                    }}
                                >
                                    <TouchableOpacity //ROJO
                                        onPress={() => PressSoundSwitch('red')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/colors/rojo.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //naranja
                                        onPress={() => PressSoundSwitch('orange')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/colors/naranja.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                       
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //amarillo
                                        onPress={() => PressSoundSwitch('yellow')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/colors/amarillo.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //verde
                                        onPress={() => PressSoundSwitch('green')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/colors/verde.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //CELESTE
                                        onPress={() => PressSoundSwitch('lightblue')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/colors/celeste.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                          
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //AZUL
                                        onPress={() => PressSoundSwitch('blue')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/colors/azul.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //PURPURA
                                        onPress={() => PressSoundSwitch('purple')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/colors/violeta.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //ROSA
                                        onPress={() => PressSoundSwitch('pink')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/colors/rosa.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //GRIS
                                        onPress={() => PressSoundSwitch('grey')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/colors/gris.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //negro
                                        onPress={() => PressSoundSwitch('black')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/colors/negro.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <ActionButton  //languages
                                        renderIcon={(active) =>
                                            <Image
                                                //source={require("../img/languages.png")}
                                                source={languageIcon}
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen_horizontal,
                                                    height: altura_imagen_horizontal,
                                                    alignSelf: "center",
                                                    borderRadius: 10,
                                                }}
                                            />
                                        }
                                        verticalOrientation="up"
                                        position="left"
                                        hideShadow={true}
                                        buttonColor="rgba(0, 0, 0, 0.0)"
                                        spacing={35}
                                        backgroundTappable={true}
                                        useNativeFeedback={false}
                                        backdrop={false}
                                    >

                                        <ActionButton.Item >
                                            <TouchableOpacity
                                                //onPress={() => setLanguage("es")}
                                                onPress={() => setItemsAtr(1)}
                                                style={{
                                                    width: ancho_vista_horizontal,
                                                    height: altura_vista_horizontal,
                                                    alignSelf: "center",
                                                    borderRadius: 50,

                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/spain.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>

                                        <ActionButton.Item >
                                            <TouchableOpacity
                                                //onPress={() => setLanguage("en")}
                                                onPress={() => setItemsAtr(2)}
                                                style={{
                                                    width: ancho,
                                                    height: altura,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/eeuu.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>

                                        <ActionButton.Item >
                                            <TouchableOpacity
                                                //onPress={() => setLanguage("por")}
                                                onPress={() => setItemsAtr(3)}
                                                style={{
                                                    width: ancho,
                                                    height: altura,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/brazil.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>
                                    </ActionButton>

                                    <ActionButton  // topics
                                        renderIcon={(active) =>
                                            <Image
                                                source={require("../img/topics.png")}
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen_horizontal,
                                                    height: altura_imagen_horizontal,
                                                    alignSelf: "center",
                                                    borderRadius: 10,
                                                }}
                                            />
                                        }
                                        hideShadow={true}
                                        verticalOrientation="up"
                                        buttonColor="rgba(0, 0, 0, 0.0)"
                                        spacing={35}
                                    >
                                        <ActionButton.Item >
                                            <TouchableOpacity
                                                onPress={() => setTopic("colores")}
                                                style={{
                                                    width: ancho,
                                                    height: altura,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/colors2.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>

                                        <ActionButton.Item >
                                            <TouchableOpacity
                                                onPress={() => setTopic("numeros")}
                                                style={{
                                                    width: ancho,
                                                    height: altura,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/numbers.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>

                                        <ActionButton.Item  >
                                            <TouchableOpacity
                                                onPress={() => setTopic("animales")}
                                                style={{
                                                    width: ancho,
                                                    height: altura,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/animals.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>

                                    </ActionButton>
                                </View>
                            )
                        }
                        if (topic == 'numeros') {
                            return (
                                <View //CONTENEDOR DE numeros
                                    style={{
                                        flexWrap: "wrap",
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        marginTop: win.height / 20,
                                        height: win.height / 1.2,
                                    }}
                                >
                                    <TouchableOpacity //UNO
                                        onPress={() => PressSoundSwitch('one')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/numbers/uno.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //DOS
                                        onPress={() => PressSoundSwitch('two')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/numbers/dos.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //TRES
                                        onPress={() => PressSoundSwitch('three')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/numbers/tres.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //CUATRO
                                        onPress={() => PressSoundSwitch('four')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/numbers/cuatro.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //CINCO
                                        onPress={() => PressSoundSwitch('five')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/numbers/cinco.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //SEIS
                                        onPress={() => PressSoundSwitch('six')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/numbers/seis.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //SIETE
                                        onPress={() => PressSoundSwitch('seven')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/numbers/siete.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //OCHO
                                        onPress={() => PressSoundSwitch('eight')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/numbers/ocho.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //NUEVE
                                        onPress={() => PressSoundSwitch('nine')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/numbers/nueve.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //DIEZ  
                                        onPress={() => PressSoundSwitch('ten')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/numbers/diez.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <ActionButton  //languages
                                        renderIcon={(active) =>
                                            <Image
                                                //source={require("../img/languages.png")}
                                                source={languageIcon}
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen_horizontal,
                                                    height: altura_imagen_horizontal,
                                                    alignSelf: "center",
                                                    borderRadius: 10,
                                                }}
                                            />
                                        }
                                        hideShadow={true}
                                        verticalOrientation="up"
                                        position="left"
                                        buttonColor="rgba(0, 0, 0, 0.0)"
                                        spacing={35}
                                        backgroundTappable={true}
                                        useNativeFeedback={false}
                                        backdrop={false}
                                    >

                                        <ActionButton.Item >
                                            <TouchableOpacity
                                                //onPress={() => setLanguage("es")}
                                                onPress={() => setItemsAtr(1)}
                                                style={{
                                                    width: ancho_vista_horizontal,
                                                    height: altura_vista_horizontal,
                                                    alignSelf: "center",
                                                    borderRadius: 50,

                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/spain.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>

                                        <ActionButton.Item >
                                            <TouchableOpacity
                                                //onPress={() => setLanguage("en")}
                                                onPress={() => setItemsAtr(2)}
                                                style={{
                                                    width: ancho,
                                                    height: altura,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/eeuu.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>

                                        <ActionButton.Item >
                                            <TouchableOpacity
                                                //onPress={() => setLanguage("por")}
                                                onPress={() => setItemsAtr(3)}
                                                style={{
                                                    width: ancho,
                                                    height: altura,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/brazil.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>
                                    </ActionButton>

                                    <ActionButton  // topics
                                        renderIcon={(active) =>
                                            <Image
                                                source={require("../img/topics.png")}
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen_horizontal,
                                                    height: altura_imagen_horizontal,
                                                    alignSelf: "center",
                                                    borderRadius: 10,
                                                }}
                                            />
                                        }
                                        hideShadow={true}
                                        verticalOrientation="up"
                                        buttonColor="rgba(0, 0, 0, 0.0)"
                                        spacing={35}
                                    >
                                        <ActionButton.Item >
                                            <TouchableOpacity
                                                onPress={() => setTopic("colores")}
                                                style={{
                                                    width: ancho,
                                                    height: altura,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/colors2.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>

                                        <ActionButton.Item >
                                            <TouchableOpacity
                                                onPress={() => setTopic("numeros")}
                                                style={{
                                                    width: ancho,
                                                    height: altura,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/numbers.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>

                                        <ActionButton.Item  >
                                            <TouchableOpacity
                                                onPress={() => setTopic("animales")}
                                                style={{
                                                    width: ancho,
                                                    height: altura,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/animals.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>

                                    </ActionButton>
                                </View>
                            )
                        }
                        if (topic == 'animales') {
                            return (
                                <View //CONTENEDOR DE animales
                                    style={{
                                        flexWrap: "wrap",
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        marginTop: win.height / 20,
                                        height: win.height / 1.2,
                                    }}
                                >
                                    <TouchableOpacity //CEBRA
                                        onPress={() => PressSoundSwitch('cebra')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/animals/cebra.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //LEON
                                        onPress={() => PressSoundSwitch('lion')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/animals/leon1.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //RINOCERONTE
                                        onPress={() => PressSoundSwitch('rhino')}
                                        style={{
                                            width: ancho_vista_horizontal + 2,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/animals/RINOCERONTE.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //MONO
                                        onPress={() => PressSoundSwitch('monkey')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/animals/mono.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //HIPOPOTAMO
                                        onPress={() => PressSoundSwitch('hippo')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/animals/hipopotamo1.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //TUCAN
                                        onPress={() => PressSoundSwitch('tucan')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/animals/tucan.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity // JIRAFA
                                        onPress={() => PressSoundSwitch('giraffe')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/animals/girafa.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //TIGRE
                                        onPress={() => PressSoundSwitch('tiger')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/animals/tigre.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //ZORRO
                                        onPress={() => PressSoundSwitch('fox')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/animals/zorro.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity //VACA
                                        onPress={() => PressSoundSwitch('cow')}
                                        style={{
                                            width: ancho_vista_horizontal,
                                            height: altura_vista_horizontal,
                                            alignSelf: "center",
                                            borderRadius: 50,
                                            margin: margen_horizontal,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                resizeMode: "contain",
                                                width: ancho_imagen_horizontal,
                                                height: altura_imagen_horizontal,
                                                alignSelf: "center",
                                                borderRadius: 50,
                                            }}
                                            source={require("../img/animals/vaca.png")}
                                        />

                                        <Text
                                            style={{
                                                color: "#128991",
                                                fontFamily: "Bangers_400Regular",
                                                alignSelf: "center",
                                                fontSize: 20,
                                            }}
                                        >
                                        </Text>
                                    </TouchableOpacity>

                                    <ActionButton  //languages
                                        renderIcon={(active) =>
                                            <Image
                                                //source={require("../img/languages.png")}
                                                source={languageIcon}
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen_horizontal,
                                                    height: altura_imagen_horizontal,
                                                    alignSelf: "center",
                                                    borderRadius: 10,
                                                }}
                                            />
                                        }
                                        hideShadow={true}
                                        verticalOrientation="up"
                                        position="left"
                                        buttonColor="rgba(0, 0, 0, 0.0)"
                                        spacing={35}
                                        backgroundTappable={true}
                                        useNativeFeedback={false}
                                        backdrop={false}
                                    >

                                        <ActionButton.Item >
                                            <TouchableOpacity
                                                //onPress={() => setLanguage("es")}
                                                onPress={() => setItemsAtr(1)}
                                                style={{
                                                    width: ancho_vista_horizontal,
                                                    height: altura_vista_horizontal,
                                                    alignSelf: "center",
                                                    borderRadius: 50,

                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/spain.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>

                                        <ActionButton.Item >
                                            <TouchableOpacity
                                                //onPress={() => setLanguage("en")}
                                                onPress={() => setItemsAtr(2)}
                                                style={{
                                                    width: ancho,
                                                    height: altura,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/eeuu.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>

                                        <ActionButton.Item  >
                                            <TouchableOpacity
                                                //onPress={() => setLanguage("por")}
                                                onPress={() => setItemsAtr(3)}
                                                style={{
                                                    width: ancho,
                                                    height: altura,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/brazil.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>
                                    </ActionButton>

                                    <ActionButton  // topics
                                        renderIcon={(active) =>
                                            <Image
                                                source={require("../img/topics.png")}
                                                style={{
                                                    resizeMode: "contain",
                                                    width: ancho_imagen_horizontal,
                                                    height: altura_imagen_horizontal,
                                                    alignSelf: "center",
                                                    borderRadius: 10,
                                                }}
                                            />
                                        }
                                        hideShadow={true}
                                        verticalOrientation="up"
                                        buttonColor="rgba(0, 0, 0, 0.0)"
                                        spacing={35}
                                    >
                                        <ActionButton.Item >
                                            <TouchableOpacity
                                                onPress={() => setTopic("colores")}
                                                style={{
                                                    width: ancho,
                                                    height: altura,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/colors2.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>

                                        <ActionButton.Item >
                                            <TouchableOpacity
                                                onPress={() => setTopic("numeros")}
                                                style={{
                                                    width: ancho,
                                                    height: altura,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/numbers.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>

                                        <ActionButton.Item  >
                                            <TouchableOpacity
                                                onPress={() => setTopic("animales")}
                                                style={{
                                                    width: ancho,
                                                    height: altura,
                                                    alignSelf: "center",
                                                    borderRadius: 50,
                                                }}
                                            >
                                                <Image
                                                    style={{
                                                        resizeMode: "contain",
                                                        width: ancho_imagen_horizontal,
                                                        height: altura_imagen_horizontal,
                                                        alignSelf: "center",
                                                        borderRadius: 50,
                                                    }}
                                                    source={require("../img/animals.png")}
                                                />
                                            </TouchableOpacity>
                                        </ActionButton.Item>

                                    </ActionButton>
                                </View>
                            )
                        }
                        return null;
                    })()}

                </View>
            }
        </>
    );
};

export default HomeScreen;

function useState(arg0: any): [any, any] {
    throw new Error("Function not implemented.");
}

