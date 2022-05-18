import { useRouter } from "next/router";
import { FC } from "react";
import { GetServerSideProps } from "next";
import jwt from "jsonwebtoken"

export const getServerSideProps: 
GetServerSideProps = async( { req, res } ) => {

    /**
     * get current jwt token saved in cookies 
     * as sessionToken, and return null 
     * in case user's logged out
     */
    const session = req.cookies.sessionToken || null
    
    // decode so you can access current users data
    const jwtDecoded = session && jwt.verify( 
        session, 
        // this is current session's key 
        // ill move it to .env later
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"  
    ) || null 

    // encoded jwt token
    const sessionLogout = session || 'hey'

    return {
        props: { 
            jwtDecoded: jwtDecoded,
            sessionLogout: sessionLogout 
         }
    }
}

type iat = { iat: number }

type user = {
    id: string,
    email: string, 
    createdAt: string, 
    updatesAt: string
}

interface MainChatProps {
    jwtDecoded: {
        user: user,
        iat: iat
    } | null
    sessionLogout: string | null
}

const MainChat: FC<MainChatProps> = ( { jwtDecoded, sessionLogout } ) => {

    const router = useRouter()

    /**
     * basically what @function handleLogOut does 
     * is fetch the encoded jwt to /api/logout where
     * later the cookie containing the jwt session token 
     * is updated to have expiry date set to 0 
     * thus deleting it and logging the user out 
     * and moving them back to login screen
     */

    const handleLogOut = () => {
        fetch( "/api/logout", {
            method: "POST", 
            body: JSON.stringify( sessionLogout )
        } ).then( () => router.push( "/" ) )
    }

    return (
        <div onClick={ handleLogOut }>
            { JSON.stringify( jwtDecoded ) }
        </div>
    )
}

export default MainChat