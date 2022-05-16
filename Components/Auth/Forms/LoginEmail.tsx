import { FC } from "react";
import LoginForm from "./loginForm";

const LoginEmail: FC = () => {

    return(
        <div>
            <LoginForm title={ 'email/username' } />
        </div>
    )
}

export default LoginEmail