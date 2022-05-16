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

const BuildLogin: FC = () => {

    // get ref for every form type so you can get the input
    const loginFormEmail = useRef<HTMLInputElement>( null )
    const loginFormPassword = useRef<HTMLInputElement>( null )
    const loginFormUsername = useRef<HTMLInputElement>( null )

    // store 'em in a state 
    // ( they'll return undefined otherwise )
    const[ email, setEmail ] = useState<string | undefined>( "" )
    const[ password, setPassword ] = useState<string | undefined>( "" )
    const[ username, setUsername ] = useState<string | undefined>( "" )

    // this won't stay here it's just a test 
    const selector = useAppSelector( ( state: getRegisterInfoSelector ) => state?.getRegisterInfo )

    useEffect( () => {
        console.log( selector )
    }, [ selector ] )

    /*
     * load the DOM before 
     * the rest with useEffect
     */
    useEffect( () => RotateSvg(), [] )

    return(
        <div className={ styles.login_form_wrap }>
            <div className={ styles.login_form }>
                <LoginEmail
                    handleChange={ handleChange( loginFormEmail.current, setEmail ) } 
                    loginFormRef={ loginFormEmail }/>            
                <LoginPassword 
                    loginFormRef={ loginFormPassword }
                    handleChange={ () => setPassword( loginFormPassword.current?.value ) }/>
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