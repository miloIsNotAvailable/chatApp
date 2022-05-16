import { FC } from "react";
import LoginForm from "./loginForm";
import { LoginFormType } from "../../interfaces/formInterfaces";

const LoginEmail: FC<LoginFormType> 
= ( { loginFormRef, handleChange } ) => {

    return(
        <div>
            <LoginForm  
                title={ 'email/username' } 
                loginFormRef={ loginFormRef }
                handleChange={ handleChange }/>
        </div>
    )
}

export default LoginEmail