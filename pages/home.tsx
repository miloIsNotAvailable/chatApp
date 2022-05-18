import { useRouter } from "next/router";
import { FC } from "react";
import { GetServerSideProps } from "next";
import jwt from "jsonwebtoken"

export const getServerSideProps: 
GetServerSideProps = async( { req, res } ) => {

    const session = req.cookies.sessionToken || null
    const jwtDecoded = session && jwt.verify( 
        session, 
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"  
    ) || null 

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
    // console.log( sessionLogout )

    /**
     * basically what @function handleLogOut does 
     * is fetch the encoded jwt to /api/logout where
     * later the cookie containing the jwt session token 
     * is updated to have expiry date set to 0 
     * thus deleting it and logging the user out 
     * and moving him back to login screen
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