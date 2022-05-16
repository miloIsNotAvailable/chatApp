import { FC } from "react";
import { setUserData } from "../../store/getRegisterInfo";
import { useAppDispatch } from "../../store/hooks";
import { styles } from "./registerStyles";

interface ProceedProps {
    registerEmail: string | undefined
    registerPassword: string | undefined
    registerUsername: string | undefined
}

const Proceed: FC<ProceedProps> 
= ( {
    registerEmail, 
    registerPassword, 
    registerUsername
} ) => {

    const dispatch = useAppDispatch()

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