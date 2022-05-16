import { FC, useRef } from "react";
import style from '../../../styles/Login.module.css'
import { setUserData } from "../../store/getRegisterInfo";
import { useAppDispatch } from "../../store/hooks";

interface loginFormProps {
    title: string
}

const LoginForm: FC<loginFormProps> = ( { title } ) => {

    const inputRef = useRef<HTMLInputElement>( null )

    const dispatch = useAppDispatch()

    const handleChange = () => {
        dispatch( setUserData( { 
                email: inputRef?.current?.value, 
                username: inputRef?.current?.value 
            } 
        ) )
        console.log( inputRef.current?.value )
    }

    return(
        <div className={ style.input_form_wrap }>
            <div> { title } </div>
            <input 
            ref = { inputRef }
            className={ style.input }
            placeholder={ title }
            onChange={ handleChange }/>
        </div>
    )
}

export default LoginForm