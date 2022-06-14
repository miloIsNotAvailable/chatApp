import { 
    FC, 
    useEffect, 
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
import { fetchingType, loginErrorsSelector, SelectorType } from "../../interfaces/formInterfaces";

const BuildLogin: FC = ( ) => {

    /*
     * load the DOM before 
     * the rest with useEffect
     */

    const formSelector = useAppSelector( 
        ( { formReducer }: SelectorType ) => formReducer
     )

    useEffect( () => RotateSvg(), [] )

    const selector = useAppSelector( 
        ( { fetching: { 
            isFetching 
        } }: fetchingType ) => isFetching
     )

     const validEmail = useAppSelector( ( state: loginErrorsSelector ) => state.getLoginErrors.error )

    return(
        <div className={ styles.login_form_wrap }>
            <div className={ styles.login_form }>
                <LoginEmail />
                <LoginPassword />
                <LoginButton />
                <RedirectToRegister/>
                { selector && 
                formSelector.getEmail.email && 
                formSelector.getPassword.password && 
                !validEmail ?

                    <div className={ styles.login_loading }>
                            loading data...
                    </div> : <></>
                }
            </div>
            <Bg/>            
        </div>
    )
}

export default BuildLogin