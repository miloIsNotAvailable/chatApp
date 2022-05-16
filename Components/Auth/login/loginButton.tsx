import { FC } from "react";
import { styles } from "./loginStyles"
import { getRegisterInfoState } from "../../store/interfaces";
import { useAppSelector } from "../../store/hooks";

interface getRegisterInfoSelector {
    getRegisterInfo: getRegisterInfoState
}

const LoginButton: FC = () => {

    const selector = useAppSelector( ( state: getRegisterInfoSelector ) => state?.getRegisterInfo )

    return(
        <div 
            className={ styles.login_button }
            onClick={ () => console.log( selector ) }>
            login
        </div>
    )
}

export default LoginButton