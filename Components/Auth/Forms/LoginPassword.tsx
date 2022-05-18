import { FC, useRef } from "react";
import { setUserPassword } from "../../store/getPassword";
import { useAppDispatch } from "../../store/hooks";
import LoginForm from "./loginForm";

/**
 * @function LoginPassword
 * updates password on change 
 * using combined redcuer  
 */


const LoginPassword: FC = ( ) => {

    const ref = useRef<HTMLInputElement | null>( null )

    const dispatch = useAppDispatch()

    const handleChange = () => {
        dispatch( setUserPassword( {
            password: ref.current?.value
        } ) )
    }

    return(
        <div>
            <LoginForm 
            title={ 'password' } 
            handleChange={ handleChange }
            loginFormRef={ ref }/>
        </div>
    )
}

export default LoginPassword