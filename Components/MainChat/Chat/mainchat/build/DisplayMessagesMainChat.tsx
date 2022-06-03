import { FC, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMessages } from "../useMessages";
import { useUserInfo } from "../../../../constants/userConstants";
import { usePagination } from "../pagination";
import { MessageType } from "../../../../store/interfaces";
import DisplayMessage from "../displayMessage";
import DisplayNoMessagesMainChat from './DisplayNoMessagesMainChat'
import MainChatLayout from "./MainChatLayout";

type Msg = MessageType & { messageID: string }

const DisplayMessagesMainChat: FC = () => {

    const { channelID, channels } = useUserInfo()        
    const [ msgs ] = useMessages()

    const { more, setPaginate } = usePagination( msgs )

    
    useEffect( () => {
        const mainchatRef = document.getElementById( 'mainchat' )
        
        if( !mainchatRef ) return
        
        mainchatRef.onscroll = () => {
            if( !mainchatRef ) return
            
            const { scrollTop, offsetHeight, scrollHeight } = mainchatRef

            if( scrollHeight + scrollTop === offsetHeight + 1 ){
                setPaginate( msgs ) 
            } 
        }
    } )

    if( msgs.length === 0 ) return (
        <DisplayNoMessagesMainChat/>
    )

    return (
        <AnimatePresence exitBeforeEnter>
        {
            [...msgs, ...more].map( ( v: Msg, ind: number ) => (
                channelID === v?.channelID && 
                <motion.div 
                    key={ v.messageID }
                    transition={  { delay: ind * .01 } }
                    style={ { height: '1rem' } } 
                    initial={ { opacity: 0, transform: 'translate(10%, 0)', height: 'auto' } }
                    animate={ { opacity: 1, transform: 'translate(0%, 0)', width: 'auto' } }
                    exit={ { opacity: 0, transform: 'translate(-10%, 0)', height: 'auto' } }>
                    <DisplayMessage 
                        ind={ ind }
                        { ...v }
                    />
                </motion.div>
                ) )
            }
        </AnimatePresence>
    )
}

export default DisplayMessagesMainChat