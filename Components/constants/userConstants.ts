import { useContext } from "react"
import { SessionRerouteContext } from "../contexts/context"

export const useUserInfo = () => {
    const sessionContext = useContext( SessionRerouteContext )
    const sessionContextUser = sessionContext?.user
    const channelID = sessionContext?.id

    return { ...sessionContextUser, channelID }
}