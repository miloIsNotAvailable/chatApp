import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { auth } from "../../constants/firebaseConfig";
import { SelectorType } from "../../interfaces/formInterfaces";
import { useAppSelector } from "../../store/hooks";
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

    const router = useRouter()

    useEffect( () => {
        
        // if( !selector?.email || !selector?.password ) return

        // console.log( selector )

        // createUserWithEmailAndPassword( 
        //     auth, 
        //     selector.email, 
        //     selector?.password ).then( () => {
        //         router.push( "/home" )
        //     }  ).then( () => {
                
        //         // so that  uid doesnt return undefined
        //         if( !auth.currentUser?.uid ) return 
                
        //         // this gets all the inputs and fetches them 
        //         // to api/post where a user is created
        //         createUser( { 
        //             ...selector, 
        //             id: auth.currentUser?.uid 
        //         } )  
        //     } )
        //     .catch( e => console.log( e ) )

        // createUser( { ...selector, id: "1234" } )

    }, [ selector, router ] )

    const handleClick = () => console.log( selector )

    return ( 
        <div>
            <div className={ styles.proceed_button }
            onClick={ handleClick }>
                ready?
            </div>
        </div>
     )
}

export default Proceed