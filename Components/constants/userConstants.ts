import { Channel } from "@prisma/client"
import { useCallback, useContext, useEffect } from "react"
import { SessionRerouteContext } from "../contexts/context"
import { useFetch } from "../MainChat/FriendsList/FetchChannels"

export const useUserInfo = () => {
    const sessionContext = useContext( SessionRerouteContext )
    const sessionContextUser = sessionContext?.user
    const channelID = sessionContext?.id
    const channels: any = sessionContext?.channels

    return { ...sessionContextUser, channelID, channels }
}