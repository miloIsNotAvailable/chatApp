import { FC, useEffect } from "react";
import { motion } from 'framer-motion'
import ReactMarkdown from "react-markdown";
import { styles } from "../ChatStyles";
import { parseColor } from "./parseColorToString";

interface DisplayMessageProps {
    messageID: string
    ind: number
    content: string
}

const DisplayMessage: FC<DisplayMessageProps> 
= ( { content, ind, messageID } ) => {

    useEffect(  () => {
        console.log(parseColor( ":p:**hey**:p: I :r:am I ye:r: ye" ))
    }, [])

    if( parseColor( content ) ) return (
        <div
        className={ styles.chat_user_message_wrap } 
        key={ messageID }
        > 
            <div className={ styles.chat_user_icon }/>
            <div className={ styles.chat_user_msg }>
                {
                    parseColor( content )?.map(
                        ( { text, color } ) => (
                            <span key={ null } style={ { color } }>
                                <ReactMarkdown>
                                    { text.replace( / /g, '\u00A0' ) }
                                </ReactMarkdown>
                            </span>
                        )
                    )
                }
            </div>
        </div>
    )

    return(
            <div
            className={ styles.chat_user_message_wrap } 
            key={ messageID }
            > 
                <div className={ styles.chat_user_icon }/>
                <div className={ styles.chat_user_msg }> 
                <ReactMarkdown>
                    { content } 
                </ReactMarkdown>
                </div>
            </div>
        // </motion.div>
    )
}

export default DisplayMessage