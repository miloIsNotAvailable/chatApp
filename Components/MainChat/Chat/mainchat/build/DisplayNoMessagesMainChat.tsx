import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FC, useRef } from "react";
import { styles } from "../../ChatStyles";
import DisplayCall from "../calls/DisplayCall";
import newMessage from "../../../../../graphics/newMessage.svg";
import { useAppSelector } from "../../../../store/hooks";
import { getChannelUsernameState } from "../../../../interfaces/mainchatInterfaces";
import ChatInput from "../../chatInput";

const DisplayNoMessagesMainChat: FC = () => {

    const mainchatRef = useRef<HTMLDivElement>( null )

    const selector = useAppSelector( 
        ( 
            { channelUsername }: getChannelUsernameState 
        ) => channelUsername?.name 
    )

    return (
        <div 
            id={ 'mainchat' } 
            ref={ mainchatRef } 
            className={ styles.chat_message_display }>
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    initial={ { opacity: 0, transform: 'translate(10%, 0)' } }
                    animate={ { opacity: 1, transform: 'translate(0%, 0)' } }
                    exit={ { opacity: 0, transform: 'translate(-10%, 0)'} } 
                    className={ styles.chat_conversation_wrap } 
                    key="start new conversation">
                    <div className={ styles.chat_start_conversation }>
                        <Image
                            src={ newMessage }
                            alt=""
                        />
                        <p>
                            send a message to @{ selector }
                        </p>
                    </div>
                </motion.div>
                </AnimatePresence>
            </div>
    )
}

export default DisplayNoMessagesMainChat