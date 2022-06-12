import { FC, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMessages } from "./useMessages";
import { useUserInfo } from "../../../../constants/userConstants";
import { usePagination } from "../pagination";
import { highlightMsgs, MessageType } from "../../../../store/interfaces";
import DisplayMessage from "./displayMessage";
import DisplayNoMessagesMainChat from './DisplayNoMessagesMainChat'
import MainChatLayout from "./MainChatLayout";
import { parseColor } from "./parseColorToString";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import useUserReadMsg from "./useUserReadMessage";
import { messageIsUnread } from "../../../../store/checkForReadMessages";
import { listenToMessages } from "../listenToMessages";

type Msg = MessageType & { messageID: string, from: string }
type highlightMsgsType = { highlightMsgs: highlightMsgs }

const DisplayMessagesMainChat: FC = () => {

    const { channelID, name, channels } = useUserInfo()        
    const [ msgs ] = useMessages()

    const { more, setPaginate } = usePagination( msgs )

    const selector = useAppSelector( 
        ( state: highlightMsgsType ) => state.highlightMsgs.open
    )

    // const memoizeReceived = useCallback( () => listenToMessages( console.log ), [] )
    useEffect( () => { listenToMessages( console.log ) } )
    
    const readMsg = useUserReadMsg()
    const dispatch = useAppDispatch()

    useEffect( () => {
        readMsg( msgs )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ channelID ] )

    useEffect( () => {
        const mainchatRef = document.getElementById( 'mainchat' )

        if( !mainchatRef ) return
        
        mainchatRef.onscroll = () => {
            if( !mainchatRef ) return
            
            const { scrollTop, offsetHeight, scrollHeight } = mainchatRef

            if( (scrollHeight + scrollTop) - offsetHeight <= 1 ){
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
                style={ 
                    selector && 
                    { 
                        backgroundColor: 'rgba(84, 90, 113, .2)', 
                        borderRadius: '.5rem',
                        // height: '1rem' 
                        margin: '1rem 0'
                    } 
                    || { height: '1rem' } }
                    key={ v.messageID }
                    transition={  { delay: ind * .01 } }
                    // style={ { height: '1rem' } } 
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