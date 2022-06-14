import { FC, useRef } from "react";
import LoginForm from "./loginForm";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setUserEmail } from "../../store/getEmail";
import { loginErrorsSelector } from "../../interfaces/formInterfaces";
import style from '../../../styles/Login.module.css'

/**
 * @function LoginEmail
 * updates email on change 
 * using combined redcuer  
 */

const LoginEmail: FC = (  ) => { 

    const ref = useRef<HTMLInputElement | null>( null )
    const dispatch = useAppDispatch()

    const selector = useAppSelector( ( state: loginErrorsSelector ) => state.getLoginErrors.error )

    const handleChange = () => {
        
        const validEmail = ref.current?.value.match( /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i )
        
        validEmail && 
        dispatch( setUserEmail( {
            email: ref.current?.value
        } ) )
    }

    return(
        <div>
            {
                selector && 
                <div className={ style.login_error }>
                    { selector }
                </div>
            }
            <LoginForm  
                title={ 'email' } 
                loginFormRef={ ref }
                handleChange={ handleChange }/>
        </div>
    )
}

export default LoginEmail