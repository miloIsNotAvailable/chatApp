import { FC } from "react";
import LoginForm from "./loginForm";
import { LoginFormType } from "../../interfaces/formInterfaces";

const LoginUsername: FC<LoginFormType> 
= ( {
    handleChange, 
    loginFormRef
} ) => {

    return(
        <div>
            <LoginForm 
            title={ 'username' } 
            handleChange={ handleChange }
            loginFormRef={ loginFormRef }/>
        </div>
    )
}

export default LoginUsername