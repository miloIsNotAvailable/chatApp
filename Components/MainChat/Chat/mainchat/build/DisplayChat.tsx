import { FC, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useUserInfo } from "../../../../constants/userConstants";
import { _io } from "../../../../constants/WebSocketsConstants";
import MainChatLayout from "./MainChatLayout";
import DisplayMessagesMainChat from "./DisplayMessagesMainChat";

const DisplayChat: FC = () => {
 
    const { channelID, channels } = useUserInfo()        

    useEffect( () => { 
        const mainchat = document.getElementById( 'mainchat' )
        setTimeout( () => {
            mainchat?.scrollTo( 0, mainchat?.scrollHeight )
        }, 1000 )
     }, [ channelID, channels ] )

    return (
        <MainChatLayout>
            <DisplayMessagesMainChat/>
        </MainChatLayout>
    )
}

export default DisplayChat