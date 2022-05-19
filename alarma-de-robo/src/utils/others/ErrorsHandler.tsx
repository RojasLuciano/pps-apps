import { showMessage } from 'react-native-flash-message';

export const errorHandler = (error: any) => {
    switch(error){
        case 'auth/invalid-email':
            showMessage({type:"danger", message:"Error", description:"El email es inválido"});
            break;
        case 'auth/email-already-in-use':
            showMessage({type:"danger", message:"Error", description:"El email ingresado ya está registrado"});
            break;
        case 'auth/weak-password':
            showMessage({type:"danger", message:"Error", description:"La contraseña debe tener un mínimo de 6 carácteres"});
        break;
        case 'auth/user-not-found':
            showMessage({type:"danger", message:"Error", description:"Email y/o contraseña inválido"});
        break;
        case 'invalid-password':
            showMessage({type:"danger", message:"Error", description:"Contraseña inválida"});
        break;
        default:
            showMessage({type:"danger", message:"Error", description:"Ha ocurrido un error, por favor reintente nuevamente"});
        break;
    }
}