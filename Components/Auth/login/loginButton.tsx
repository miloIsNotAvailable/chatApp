import { FC, useEffect, useState } from "react";
import { styles } from "./loginStyles"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SelectorType } from "../../interfaces/formInterfaces";
import { useRouter } from "next/router";
import { isFetching } from "../../store/isFetching";

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
    const dispatch = useAppDispatch()

    const router = useRouter()

    const Submit = () => {

        dispatch( isFetching( { isFetching: true } ) )

        fetch( "/api/post", {
            method: "POST", 
            body: JSON.stringify( selector )
        } ).then( v => v.json() )
        .then( v => {
            if( v.error ) return 
            router.push( "/home" )
        } )
        .then( () => dispatch( isFetching( { isFetching: false } ) ) )
    } 
    
    return(
        <div 
            className={ styles.login_button }
            onClick={ Submit }>
            login
        </div>
    )
}

export default LoginButton