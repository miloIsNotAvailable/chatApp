import { FC, useEffect, useState } from "react";
import { styles } from "./loginStyles"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { SelectorType } from "../../interfaces/formInterfaces";
import { useRouter } from "next/router";
import { isFetching } from "../../store/isFetching";
import { map, of, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { subscribe } from "graphql";

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

    const loginFetch = of( { fetching: false } )

    const Submit = () => {

        if (
            selector.getEmail?.email && 
            selector.getPassword?.password
         ) {
            dispatch( isFetching( { isFetching: true } ) )
        
            loginFetch.pipe(
                switchMap(
                    ({ fetching } ) => fromFetch( 
                        '/api/post', {
                        method: 'POST',
                        body: JSON.stringify( selector )        
                    } )
                    .pipe(
                        map( ( res ) => res) 
                    )
                )
            ).subscribe( ( res ) => {
                if( !res.ok ) return
                console.log( 'done' )
                router.push( '/home' )
                dispatch( isFetching( { isFetching: false } ) )
            } )
        }
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