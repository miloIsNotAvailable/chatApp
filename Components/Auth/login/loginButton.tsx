import { FC, useEffect } from "react";
import { styles } from "./loginStyles"
import { useAppSelector } from "../../store/hooks";
import {  SelectorType } from "../../interfaces/formInterfaces";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../constants/firebaseConfig";
import { useRouter } from "next/router";
import { signIn } from 'next-auth/react'

const LoginButton: FC = () => {

    /**
     * @param selector
     * @returns the state of combined redcuer 
     * containing specified email address, 
     * password, and username 
     */

    const selector = useAppSelector( 
        ( { formReducer }: SelectorType ) => formReducer
     )

    const router = useRouter()
    
    const Submit = () => fetch( "/api/post", {
            method: "POST", 
            body: JSON.stringify( selector )
        } ).then( () => router.push( "/home" ) )
    
    return(
        <div 
            className={ styles.login_button }
            onClick={ Submit }>
            login
        </div>
    )
}

export default LoginButton