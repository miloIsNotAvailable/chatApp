import { FC } from "react";
import LoginForm from "./loginForm";

const LoginUsername: FC = () => {

    return(
        <div>
            <LoginForm title={ 'username' } />
        </div>
    )
}

export default LoginUsername