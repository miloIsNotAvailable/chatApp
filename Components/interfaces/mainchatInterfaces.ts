import { User } from "@prisma/client"

export interface SessionData {
    user: User, 
    iat: number
} 

export type SessionProps = SessionData | null