import { StyleSheet } from "react-native";

const primaryColor = '#fff';
const secondaryColor = '#3770b6';
const tertiaryColor = '#a5d1f1';
const fourthColor = '#ffffff';
const buttonBorderRadius = 8;

export default StyleSheet.create({

    container: {
        flex: 1,
     


    },
    buttonHome: {
        backgroundColor: '#557be2',
        width: '100%',
        height: '45%',
        padding: 5,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
        justifyContent: 'center',  
        borderColor: 'black',     
        borderWidth: 2, 
    },
        buttonContainerHome: {
        width: '99%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    back: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        width: '70%',
        height: '50%',
        marginBottom: '50%',
    },
    logoHome: {
        
        marginTop: '10%',
        width: 100,
        height: 194,   
        alignSelf: 'center',    

    },
    inputContainer: {
        width: '80%',
        marginTop: 10,
    },
    input: {
        backgroundColor: tertiaryColor,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: buttonBorderRadius,
        marginTop: '5%',
    },
    buttonContainer: {
        alignItems: 'center',
        width: '80%',
        height: '95%',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '5%',
    },
    buttonAccessContainer: {
        flexDirection: 'row',
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',  
        marginTop: '10%', 
    },
    button: {
        backgroundColor: secondaryColor,
        width: '100%',
        padding: 10,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
      
    },
    buttonRole: {
        backgroundColor: 'black',
        width: '100%',
        padding: 5,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
        margin: '5%',
    },
    buttonError: {
        backgroundColor: secondaryColor,
        width: '100%',
        padding: 15,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: '#ed8c47',
        marginTop: 5, 
      
    },
    buttonOutlineRole: {
        backgroundColor: 'black',
        marginTop: 5,
        borderColor: 'black',
        borderWidth: 2,
    },
    buttonText: {
        color: fourthColor,
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: fourthColor,
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineTextRole: {
        color: fourthColor,
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineTextRoom: {
        color: fourthColor,
        fontWeight: '700',
        fontSize: 16,
        height: 350,
        width: 30,
    },
    spinnerTextStyle: {
        color: 'white',
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
        marginTop: 40, 
        color: secondaryColor,
        fontWeight: 'bold',        
    },    
    textUserA:{
        fontSize: 20,  
        color: 'black',
        fontWeight: 'bold',               
    },
    textUserB:{
        color: 'black',
        fontSize: 20,  
        fontWeight: 'bold',               
    },
    textDescription:{
        fontSize: 20,
        marginTop: '10%', 
        color: secondaryColor,
        fontWeight: 'bold',  
        textAlign: 'center',
        margin: 5,
    },   

    
})