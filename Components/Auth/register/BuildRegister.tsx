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
import AnimatedString from "./AnimatedString";
import Proceed from "./proceedButton";

import { styles } from "./registerStyles";

//npx prisma studio
//npx prisma generate
//npm run dev

const BuildRegister: FC = () => {

    // get ref for every form type so you can get the input
    const registerFormEmail = useRef<HTMLInputElement>( null )
    const registerFormPassword = useRef<HTMLInputElement>( null )
    const registerFormUsername = useRef<HTMLInputElement>( null )

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

    return(
        <div className={ styles.register_form_wrap }>
            <div className={ styles.register_form }>
                <LoginForm
                    title={ "email" }
                    loginFormRef={ registerFormEmail }
                    handleChange={ () => setEmail( registerFormEmail.current?.value ) }/>
                <LoginForm
                    title={ "password" }
                    loginFormRef={ registerFormPassword }
                    handleChange={ () => setPassword( registerFormPassword.current?.value ) }/>                
                <LoginForm
                    title={ "username" }
                    loginFormRef={ registerFormUsername }
                    handleChange={ () => setUsername( registerFormUsername.current?.value ) }/>
                
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