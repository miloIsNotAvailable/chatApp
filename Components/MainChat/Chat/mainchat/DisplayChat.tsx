import { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion'
import DisplayMessage from "./displayMessage";
import UserIsTyping from "../userIsTyping";
import ChatInput from "../chatInput";
import { styles } from "../ChatStyles";
import { MessageType } from "../../../store/interfaces";
import { useUserInfo } from "../../../constants/userConstants";
import { IOObservable, SocketType } from "../../../interfaces/WebSocketsTypes";
import { listenToMessages } from "./listenToMessages";
import { useChatContext } from "../../../contexts/ChatContext";
import { fetchMoreMsgs } from "./fetchMoreMessages";
import ReceivedCall from "./receivedCall";
import DisplayCall from "./DisplayCall";
import sendMessage from '../../../../graphics/newMessage.svg'
import Image from "next/image";
import newMessage from "../../../../graphics/newMessage.svg";
import { useAppSelector } from "../../../store/hooks";
import { getChannelUsernameState } from "../../../interfaces/mainchatInterfaces";

type Msg = MessageType & { messageID: string }

const DisplayChat: FC = () => {
 
    const { channelID, channels  } = useUserInfo()    
    const { msgs, setMsg } = useChatContext()
    
    const [ fetchMore, setFetchMore ] = useState( false )
    const [ paginated, setPaginated ] = useState<Msg[] | []>( [] )

    const mainchatRef = useRef<HTMLDivElement>( null )
    const msgRef = useRef<HTMLDivElement | any>( null )

    const selector = useAppSelector( 
        ( 
            { channelUsername }: getChannelUsernameState 
        ) => channelUsername?.name 
    )


    const handle = ( v: IOObservable<SocketType> ) => {
        setMsg( ( prev: any[] ): Msg[] => [ v, ...prev ] )

        setTimeout( () => {
            const mainchat = document.getElementById( 'mainchat' )
            mainchat?.scrollTo( 0, mainchat?.scrollHeight )
        }, 300 )
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const memoizeReceived = useCallback( () => listenToMessages( handle ), [] )

    useEffect( () => memoizeReceived, [ memoizeReceived ] )

    useEffect( () => { 
        const mainchat = document.getElementById( 'mainchat' )
        setTimeout( () => {
            mainchat?.scrollTo( 0, mainchat?.scrollHeight )
        }, 1000 )
     }, [ channelID, channels ] )

     const handleScroll = () => {
        if( !mainchatRef.current ) return
        
        const { scrollTop, offsetHeight, scrollHeight } = mainchatRef.current
        if( !(scrollHeight + scrollTop === offsetHeight) ) return

        setFetchMore( true )
        setTimeout( () => {
            setFetchMore( false )
        }, 1000 ) 
    }

    useEffect( () => {

        if( !fetchMore ) return

        fetchMoreMsgs( { msgsLength: [...msgs, ...paginated].length, channel: channelID } )
        .subscribe( async res => {
            if( !res.ok ) return 
            const data = await res.json()

            setPaginated( ( prev: any ) => [ ...prev, ...data ] )
        } )
    }, [ fetchMore, paginated, msgs, channelID ] )

    if( msgs.length === 0 ) return (
        <div className={ styles.chat_wrap }>
        <DisplayCall/>
        <div 
            id={ 'mainchat' } 
            ref={ mainchatRef } 
            className={ styles.chat_message_display }
            onScroll={ handleScroll }>
                <div className={ styles.chat_conversation_wrap }>
                    <div className={ styles.chat_start_conversation }>
                        <Image
                            src={ newMessage }
                            alt=""
                        />
                        <p>
                            send a message to @{ selector }
                        </p>
                    </div>
                </div>
            </div>
        <ChatInput/>
    </div>
    )

    return (
        <div className={ styles.chat_wrap }>
            <DisplayCall/>
            <div 
                id={ 'mainchat' } 
                ref={ mainchatRef } 
                className={ styles.chat_message_display }
                onScroll={ handleScroll }
            >
            <UserIsTyping/>
            <ReceivedCall/>
                <AnimatePresence exitBeforeEnter>
                    {
                        // everything is reversed 
                        // cause the way messages are displayed 
                        // is reversed 
                        [...msgs, ...paginated].map( ( v: Msg, ind: number ) => (
                            channelID === v?.channelID && 
                            <motion.div 
                                key={ v.messageID }
                                ref={ msgRef }
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
            </div>
            <ChatInput/>
        </div>
    )
}

export default DisplayChat