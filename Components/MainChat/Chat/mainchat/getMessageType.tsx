import { FC, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import { styles } from "../ChatStyles";
import { parseColor } from "./parseColorToString";

interface MessageTypeProps {
    messageID: string
    ind: number
    content: string
    Links?: JSX.Element | JSX.Element[] | string | ReactNode
}

const MessageType: FC<MessageTypeProps> 
= ( { content, ind, messageID, Links } ) => {

    if( parseColor( content ) ) return (
        <div
        className={ styles.chat_user_message_wrap } 
        key={ messageID }
        > 
            <div className={ styles.chat_user_icon }/>
            <div className={ styles.chat_user_msg }>
                <div>{ Links }</div>

                {
                    parseColor( content )?.map(
                        ( { text, color }, ind: number ) => (
                            <span key={ ind } style={ { color } }>
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
                    { Links }
                <ReactMarkdown>
                    { content } 
                </ReactMarkdown>
                </div>
            </div>
        // </motion.div>
    )
}

export default MessageType