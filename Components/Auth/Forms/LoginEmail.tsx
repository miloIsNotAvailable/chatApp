import { FC, useRef } from "react";
import LoginForm from "./loginForm";
import { useAppDispatch } from "../../store/hooks";
import { setUserEmail } from "../../store/getEmail";

/**
 * @function LoginEmail
 * updates email on change 
 * using combined redcuer  
 */

const LoginEmail: FC = (  ) => { 

    const ref=  useRef<HTMLInputElement | null>( null )
    const dispatch = useAppDispatch()

    const handleChange = () => {
        dispatch( setUserEmail( {
            email: ref.current?.value
        } ) )
    }

    return(
        <div>
            <LoginForm  
                title={ 'email/username' } 
                loginFormRef={ ref }
                handleChange={ handleChange }/>
        </div>
    )
}

export default LoginEmail