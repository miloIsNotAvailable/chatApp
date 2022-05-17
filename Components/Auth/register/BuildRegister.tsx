import { 
    FC, 
    useEffect, 
    useRef, 
    useState 
} from "react";

import { getRegisterInfoSelector } from "../../interfaces/formInterfaces";
import { useAppSelector } from "../../store/hooks";

import { 
    LoginEmail, 
    LoginForm, 
    LoginPassword, 
    LoginUsername 
} from '../Forms'
import { handleChange } from "../Forms/handleChange";
import AnimatedString from "./AnimatedString";
import Proceed from "./proceedButton";

import { styles } from "./registerStyles";

//npx prisma studio
//npx prisma generate
//npm run dev

const BuildRegister: FC = () => {

    // get ref for every form type so you can get the input
    const registerFormEmail = useRef< | null>( null )
    const registerFormPassword = useRef< | null>( null )
    const registerFormUsername = useRef< | null>( null )

    // store 'em in a state 
    // ( they'll return undefined otherwise )
    const[ email, setEmail ] = useState<string | null>( null )
    const[ password, setPassword ] = useState<string | null>( null )
    const[ username, setUsername ] = useState<string | null>( null )

    // this won't stay here it's just a test 
    const selector = useAppSelector( ( state: getRegisterInfoSelector ) => state?.getRegisterInfo )

    useEffect( () => {
        console.log( selector )
    }, [ selector ] )

    return(
        <div className={ styles.register_form_wrap }>
            <div className={ styles.register_form }>
                <LoginForm
                    title={ "email" }
                    loginFormRef={ registerFormEmail }
                    handleChange={ handleChange( registerFormEmail.current, setEmail ) }/>
                <LoginForm
                    title={ "password" }
                    loginFormRef={ registerFormPassword }
                    handleChange={ handleChange( registerFormPassword.current, setPassword ) }/>                
                <LoginForm
                    title={ "username" }
                    loginFormRef={ registerFormUsername }
                    handleChange={ handleChange( registerFormUsername.current, setUsername ) }/>
                
            </div>
            <div className={ styles.register_bg }>
                <div className={ styles.step }>1/3</div>
                <AnimatedString/>
                <Proceed 
                    registerEmail={ email }
                    registerPassword={ password }
                    registerUsername={ username } 
                />
            </div>
        </div>
    )
}

export default BuildRegister