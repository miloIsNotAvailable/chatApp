import { useUserInfo } from "../../../../constants/userConstants"
import { messageIsUnread } from "../../../../store/checkForReadMessages"
import { useAppDispatch } from "../../../../store/hooks"
import { MessageType } from "../../../../store/interfaces"

type Msg = MessageType & { messageID: string, from: string }

export const useUserReadMsg = () => {

    const { channelID, name, channels } = useUserInfo()        
    const dispatch = useAppDispatch()

    return ( msgs: any[] ) => {
        if( !channels ) return
        const findChannel = channels.find( (n: any) => msgs[0]?.channelID === n.id )
        
        dispatch( 
            messageIsUnread(
                {
                    unread: findChannel?.id !== channelID,
                    channelID: findChannel?.id
                }
            ) 
        )

    }
}

export default useUserReadMsg