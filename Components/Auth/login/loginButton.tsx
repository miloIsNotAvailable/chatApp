import { FC, useEffect, useState } from "react";
import { styles } from "./loginStyles"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUserData } from "../../store/getRegisterInfo";
import { getRegisterInfoSelector } from "../../interfaces/formInterfaces";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../constants/firebaseConfig";
import { useRouter } from "next/router";

interface LoginButtonProps {
    emailLogin?: string
    passwordLogin?: string
}

const LoginButton: FC<LoginButtonProps> 
= ( { emailLogin, passwordLogin } ) => {

    const dispatch = useAppDispatch()

    const selector = useAppSelector( ( state: getRegisterInfoSelector ) => state?.getRegisterInfo )
    const router = useRouter()

    useEffect( () => {
        
        if( !selector?.email || !selector?.password ) return

        console.log( selector )

        signInWithEmailAndPassword( 
            auth, 
            selector.email, 
            selector?.password ).then( () => {
                router.push( "/home" )
            }  ).catch( e => console.log( e ) )
    }, [ selector, router ] )

    const Submit = () => dispatch( setUserData( {
        email: emailLogin, 
        password: passwordLogin
    } ) )
    
    return(
        <div 
            className={ styles.login_button }
            onClick={ Submit }>
            login
        </div>
    )
}

export default LoginButton