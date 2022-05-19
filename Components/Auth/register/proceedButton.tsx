import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { SelectorType } from "../../interfaces/formInterfaces";
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

    const selector = useAppSelector( 
        ( { formReducer }: SelectorType ) => formReducer 
     )
    const dispatch = useAppDispatch()

    const router = useRouter()

    const Submit = () => {

        dispatch( isFetching( { isFetching: true } ) )

        fetch( "/api/signin", {
            method: "POST", 
            body: JSON.stringify( selector )
        } ).then( v => v.json() )
        .then( v => {
            if( v.error ) return 
            router.push( "/home" )
        } )
        .then( () => dispatch( isFetching( { isFetching: false } ) ) )
    } 

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