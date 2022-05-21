import { StyleSheet } from "react-native";


const primaryColor = '#cdd7bf';
const secondaryColor = 'black';
const tertiaryColor = '#b9b9b9';
const fourthColor = '#617a69';
const buttonBorderRadius = 30;
const buttonBorderRadiusImput = 20;





export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container2: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        justifyContent: "center"
    }, 
    logo: {
        width: '100%',
        height: '40%',
    },
    logoHome: {
        width: '100%',
        height: '40%',
        marginTop: '5%',
    },
    inputContainer: {
        width: '80%',
        marginTop: 10,
    },
    input: {
        backgroundColor: primaryColor,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: buttonBorderRadiusImput,
        borderColor: fourthColor,
        borderWidth: 5,
        marginTop: '5%',
        fontFamily: "IndieFlower_400Regular",
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
    },
    button: {
        backgroundColor: secondaryColor,
        width: '80%',
        padding: 40,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
        marginBottom: '8%',
    },
    buttonHome: {
        backgroundColor: secondaryColor,
        width: '80%',
        padding: 10,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
        marginBottom: '8%',
    },
    buttonLogin: {
        backgroundColor: secondaryColor,
        width: '60%',
        padding: 20,
        borderRadius: buttonBorderRadiusImput,
        alignItems: 'center',
        fontFamily: "IndieFlower_400Regular",      

        
    },
    buttonRole: {
        marginTop: '2%',
        backgroundColor: tertiaryColor,
        width: '100%',
        padding: 5,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
    },
    buttonError: {
        backgroundColor: 'red',
        width: '100%',
        padding: 15,
        borderRadius: buttonBorderRadiusImput,
        alignItems: 'center',
        marginBottom: 5,
    },
    buttonOutline: {
        backgroundColor: primaryColor,
        marginTop: 5,
        borderColor: fourthColor,
        borderWidth: 10,
    },
    buttonOutlinehome: {
        backgroundColor: primaryColor,
        marginTop: 5,
        borderColor: fourthColor,
        borderWidth: 5,
    },
    buttonOutlineLogin: {
        backgroundColor: primaryColor,
        marginTop: 5,
        borderColor: fourthColor,
        borderWidth: 5,
    },
    buttonOutlineRole: {
        backgroundColor: tertiaryColor,
        marginTop: 2,
    },
    buttonText: {
        color: primaryColor,
      
        fontSize: 16,
        fontFamily: "IndieFlower_400Regular",
       
    },
    buttonOutlineText: {
        color: fourthColor,
        fontSize: 16,
        fontFamily: "IndieFlower_400Regular",
    },
    buttonOutlineTextRole: {
        color: secondaryColor,
        fontSize: 19,
        fontFamily: "IndieFlower_400Regular",
    },
    spinnerTextStyle: {
        color: 'white',
        fontFamily: "IndieFlower_400Regular",
    },
    spinContainer: {
        position: 'absolute',
        display: 'flex',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        height: '100%',
        width: '100%',
        zIndex: 100,
    },
    textHome:{
        fontSize: 60,
        marginTop: 5, 
        color: secondaryColor,
            
    },
    textTitleHome:{
        fontSize: 30,
        marginTop: 5, 
        color: secondaryColor,
          
        fontFamily: "IndieFlower_400Regular", 
    },
    textDescription:{
        fontSize: 20,
        marginTop: '10%', 
        color: secondaryColor,
        
        textAlign: 'center',
        margin: 5,
    }, 
    qrArea:{
        width: 200,
        height: 200,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 30,
    } 
 

    
})