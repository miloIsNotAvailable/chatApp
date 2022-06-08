import { FC, useEffect, useState } from "react";
import { styles } from "../../MicStyles";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../../store/hooks";
import { highlightedUserMsgs } from "../../../store/highlightMsgs";

const HighlightMsgs: FC = () => {

    const[ open, setOpen ] = useState( false )

    const dispatch = useAppDispatch()

    useEffect( () => {
        dispatch( 
            highlightedUserMsgs( { open: open } )
         )
    }, [ open ] )

    return (
        <div className={ styles.highlight_wrap }>
            <div className={ styles.setting_title }>
                highlight your messages
            </div>
            <div className={ styles.highlight_button }
            onClick={ () => setOpen( !open ) }>
                <motion.div
                animate={ { 
                    backgroundColor: open ? 'var(--green)': 'var(--grey)',
                    left: open ? "2vw" : "0" 
                } } 
                className={ styles.highlight_button_inside }/>
            </div>
        </div>
    )
}

export default HighlightMsgs