import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { GetServerSideProps, InferGetServerSidePropsType, GetStaticProps } from "next";
import jwt from "jsonwebtoken"
import { User } from "@prisma/client";
import MainChat from "../../Components/MainChat";
import { SessionContext, SessionRerouteContext } from "../../Components/contexts/context";
import { SessionProps } from "../../Components/interfaces/mainchatInterfaces";
import { _io } from "../../Components/constants/WebSocketsConstants";
import { map, mergeMap, of } from "rxjs";

/**
 * decide whether user exists 
 * before the html is loaded, 
 * so that the website doesn't go 
 * funky mode and switch between login screen 
 * and main chat  
 */
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

    const d = await fetch( 'http://localhost:3000/api/get_channels', {
        method: 'POST', 
        body: JSON.stringify( jwtDecoded )
    } )
    const data = await d.json()

    return {
        props: { 
            jwtDecoded: jwtDecoded,
            sessionLogout: sessionLogout,
            data
         }
    }
}

const Chat: FC<InferGetServerSidePropsType<typeof getServerSideProps>> 
= ( { 
    jwtDecoded, 
    sessionLogout,
    data
} ) => {

    const router = useRouter()
    const { id } = router.query

    useEffect( () => {
        router.prefetch( `/${ id }` )
    } )

    /**
     * basically what @function handleLogOut does 
     * is fetch the encoded jwt to /api/logout where
     * later the cookie containing the jwt session token 
     * is updated to have expiry date set to 0 
     * thus deleting it and logging the user out 
     * and moving them back to login screen
     */

    console.log( data )

    const handleLogOut = () => {
        fetch( "/api/logout", {
            method: "POST", 
            body: JSON.stringify( sessionLogout )
        } ).then( () => router.push( "/" ) )
    }

    /**
     * wrap the mainchat function 
     * in SessionContext.Provider
     * so we can get the session token 
     * in every child of MainChat
     */

    return (
        <div onClick={  () => {} }>
            <SessionRerouteContext.Provider 
            value={  { 
                ...jwtDecoded, 
                id, 
                channels: data
                } }>
                <MainChat/>
            </SessionRerouteContext.Provider>
        </div>
    )
}

export default Chat