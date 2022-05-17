import { 
    FC, 
    RefObject, 
    useEffect, 
    useRef, 
    useState 
} from "react";

import { 
    LoginEmail, 
    LoginPassword 
} from '../Forms'

import { styles } from "./loginStyles";

import RedirectToRegister from "./RedirectToRegister";
import Bg from './svgBg'
import RotateSvg from "./rotateSvg";
import LoginButton from "./loginButton";
import { useAppSelector } from "../../store/hooks";
import { getRegisterInfoSelector } from "../../interfaces/formInterfaces";
import { handleChange } from "../Forms/handleChange";
import LoginForm from "../Forms/loginForm";

const BuildLogin: FC = () => {

    // get ref for every form type so you can get the input
    const loginFormEmail = useRef<HTMLInputElement | null>( null )
    const loginFormPassword = useRef<HTMLInputElement | null>( null )

    // store 'em in a state 
    // ( they'll return undefined otherwise )
    const[ email, setEmail ] = useState<string | null>( null )
    const[ password, setPassword ] = useState<string | null>( null )

    /*
     * load the DOM before 
     * the rest with useEffect
     */
    useEffect( () => RotateSvg(), [] )

    return(
        <div className={ styles.login_form_wrap }>
            <div className={ styles.login_form }>
                <LoginForm
                    title={ "email" }
                    handleChange={ handleChange( loginFormEmail.current, setEmail ) } 
                    loginFormRef={ loginFormEmail }/>            
                <LoginForm
                    title={ "password" } 
                    loginFormRef={ loginFormPassword }
                    handleChange={ handleChange( loginFormPassword.current, setPassword ) }/>
                <LoginButton 
                    emailLogin={ email }
                    passwordLogin={ password }/>
                <RedirectToRegister/>
            </div>
            <Bg/>            
        </div>
    )
}

export default BuildLogin