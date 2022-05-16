import { FC, useEffect, useState } from "react";
import { styles } from "./loginStyles"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUserData } from "../../store/getRegisterInfo";
import { getRegisterInfoSelector } from "../../interfaces/formInterfaces";

interface LoginButtonProps {
    emailLogin?: string
    passwordLogin?: string
}

const LoginButton: FC<LoginButtonProps> 
= ( { emailLogin, passwordLogin } ) => {

    const dispatch = useAppDispatch()

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