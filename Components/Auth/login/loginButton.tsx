import { FC, useEffect } from "react";
import { styles } from "./loginStyles"
import { useAppSelector } from "../../store/hooks";
import {  SelectorType } from "../../interfaces/formInterfaces";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../constants/firebaseConfig";
import { useRouter } from "next/router";

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

    useEffect( () => {

        // console.log( selector )

        // signInWithEmailAndPassword( 
        //     auth, 
        //     selector.email, 
        //     selector?.password ).then( () => {
        //         router.push( "/home" )
        //     }  ).catch( e => console.log( e ) )
    }, [ selector, router ] )

    const Submit = () => console.log( selector )
    
    return(
        <div 
            className={ styles.login_button }
            onClick={ Submit }>
            login
        </div>
    )
}

export default LoginButton