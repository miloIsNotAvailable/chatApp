import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { auth } from "../../constants/firebaseConfig";
import { getRegisterInfoSelector } from "../../interfaces/formInterfaces";
import { setUserData } from "../../store/getRegisterInfo";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import createUser from "./createUser";
import { styles } from "./registerStyles";

interface ProceedProps {
    registerEmail: string | null
    registerPassword: string | null
    registerUsername: string | null
}

const Proceed: FC<ProceedProps> 
= ( {
    registerEmail, 
    registerPassword, 
    registerUsername
} ) => {

    const dispatch = useAppDispatch()

    const selector = useAppSelector( ( 
        state: getRegisterInfoSelector 
        ) => state?.getRegisterInfo 
    )
    const router = useRouter()

    useEffect( () => {
        
        if( !selector?.email || !selector?.password ) return

        console.log( selector )

        createUserWithEmailAndPassword( 
            auth, 
            selector.email, 
            selector?.password ).then( () => {
                router.push( "/home" )
            }  ).then( () => {
                
                // so that  uid doesnt return undefined
                if( !auth.currentUser?.uid ) return 
                
                // this gets all the inputs and fetches them 
                // to api/post where a user is created
                createUser( { 
                    ...selector, 
                    id: auth.currentUser?.uid 
                } )  
            } )
            .catch( e => console.log( e ) )

        // createUser( { ...selector, id: "1234" } )

    }, [ selector, router ] )

    const handleClick = () => dispatch( setUserData( {
        email: registerEmail, 
        password: registerPassword, 
        username: registerUsername
    } ) )

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