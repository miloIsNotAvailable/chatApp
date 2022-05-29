import { m } from "framer-motion";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { map, of, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { fetchingType, SelectorType } from "../../interfaces/formInterfaces";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { isFetching } from "../../store/isFetching";
import { styles } from "./registerStyles";

const Proceed: FC = () => {

    /**
     * @param selector
     * @returns the state of combined redcuer 
     * containing specified email address, 
     * password, and username 
     */

     const loading = useAppSelector( 
        ( { fetching: { 
            isFetching 
        } }: fetchingType ) => isFetching
     )


    const selector = useAppSelector( 
        ( { formReducer }: SelectorType ) => formReducer 
     )
    const dispatch = useAppDispatch()

    const router = useRouter()

    const registerFetch = of( { fetching: false } )

    const Submit = () => {

        dispatch( isFetching( { isFetching: true } ) )

        registerFetch.pipe(
            switchMap( 
                () => fromFetch( '/api/signin', {
                    method: "POST",
                    body: JSON.stringify( selector )
                } ).pipe(
                    map( res => res )
                )
             )
        ).subscribe( ( res ) => {
            if( !res.ok ) return
            router.push( "/home/[id]" )
            dispatch( isFetching( { isFetching: false } ) )
        } )

        // fetch( "/api/signin", {
        //     method: "POST", 
        //     body: JSON.stringify( selector )
        // } ).then( v => v.json() )
        // .then( v => {
        //     if( v.error ) return 
        //     router.push( "/home" )
        // } )
        // .then( () => dispatch( isFetching( { isFetching: false } ) ) )
    } 

    if( loading ) return ( 
        <div>
            <div className={ styles.proceed_button }
            onClick={ Submit }>
                loading
            </div>
        </div>
     )

    return ( 
        <div>
            <div className={ styles.proceed_button }
            onClick={ Submit }>
                ready?
            </div>
        </div>
     )
}

export default Proceed