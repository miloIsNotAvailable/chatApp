import { useEffect } from "react"
import { useUserInfo } from "../../../../constants/userConstants"
import { messageIsUnread } from "../../../../store/checkForReadMessages"
import { useAppDispatch } from "../../../../store/hooks"
import { MessageType } from "../../../../store/interfaces"

type Msg = MessageType & { messageID: string, from: string }

export const useUserReadMsg = () => {

    const { channelID, channels } = useUserInfo()        
    const dispatch = useAppDispatch()

    return ( msgs: any[] ) => {
        if( !channels ) return
        const findChannel = channels.find( (n: any) => msgs[0]?.channelID === n.id )

        findChannel?.id === channelID && dispatch( 
            messageIsUnread(
                {
                    unread: false,
                    channelID: findChannel?.id,
                    unreadMsgs: 0
                }
            ) 
        )
    }
}

export default useUserReadMsg