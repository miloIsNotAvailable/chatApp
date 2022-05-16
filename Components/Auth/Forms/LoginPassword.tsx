import { FC } from "react";
import { LoginFormType } from "../../interfaces/formInterfaces";
import LoginForm from "./loginForm";

const LoginPassword: FC<LoginFormType> 
= ( {
    handleChange, 
    loginFormRef
} ) => {

    return(
        <div>
            <LoginForm 
            title={ 'password' } 
            handleChange={ handleChange }
            loginFormRef={ loginFormRef }/>
        </div>
    )
}

export default LoginPassword