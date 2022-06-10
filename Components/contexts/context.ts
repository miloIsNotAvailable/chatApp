import { Channel, User } from "@prisma/client";
import { createContext } from "react";
import { SessionProps, SessionData } from "../interfaces/mainchatInterfaces";

export const SessionContext 
= createContext<SessionProps>( null )

export type SessionReroute = { 
    id: any
    user?: User | undefined 
    iat?: number | undefined
    channels: Channel[],
    jwt?: string | null
}
type v = SessionReroute | null

export const SessionRerouteContext = 
createContext<SessionReroute | null>( null )