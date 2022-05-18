import { FC, useRef } from "react";
import LoginForm from "./loginForm";
import { useAppDispatch } from "../../store/hooks";
import { setUserUsername } from "../../store/getUsername";

/**
 * @param LoginUsername
 * updates username on change 
 * using combined redcuer  
 */

const LoginUsername: FC = () => {

    const ref = useRef<HTMLInputElement | null>( null )

    const dispatch = useAppDispatch()

    const handleChange = () => {
        dispatch( setUserUsername( {
            username: ref.current?.value
        } ) )
    }

    return(
        <div>
            <LoginForm 
                title={ 'username' } 
                handleChange={ handleChange }
                loginFormRef={ ref }/>
        </div>
    )
}

export default LoginUsername