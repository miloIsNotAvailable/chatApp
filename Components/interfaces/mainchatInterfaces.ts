import { User } from "@prisma/client"
import { ChannelUsername, unreadType } from "../store/interfaces"

export interface SessionData {
    user: User, 
    iat: number
} 

export type getChannelUsernameState = {
    channelUsername: ChannelUsername
}

export type SessionProps = SessionData | null

export type readMsgs = { checkForReadMessages: unreadType }
