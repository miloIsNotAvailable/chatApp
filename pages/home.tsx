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

interface MainChatProps {
    jwtDecoded: any
    sessionLogout: any
}

const MainChat: FC<MainChatProps> = ( { jwtDecoded, sessionLogout } ) => {

    const router = useRouter()
    // console.log( sessionLogout )

    !jwtDecoded && router.push( "/" )

    return (
        <div onClick={ () => {} }>
            { JSON.stringify( jwtDecoded ) }
        </div>
    )
}

export default MainChat