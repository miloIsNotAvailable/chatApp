import { FC, useEffect, useState } from "react";
import { motion } from 'framer-motion'
import ReactMarkdown from "react-markdown";
import { styles } from "../ChatStyles";
import { parseColor } from "./parseColorToString";
import MessageType from "./getMessageType";
import { checkForLinks } from "./checkForLinks";
import Head from "next/head";

interface DisplayMessageProps {
    messageID: string
    ind: number
    content: string
}

const DisplayMessage: FC<DisplayMessageProps> 
= ( v ) => {

    const [ isLink, setIsLink ] = useState<
    { 
        link: string | undefined, 
        image: string | undefined 
    }
    >( { link: undefined, image: undefined } )

    useEffect( () => {
        setIsLink( checkForLinks( v.content ) )
    }, [ v.content ] )

    if( isLink.link ) return (
        <MessageType {...v} 
            content={ v.content.replace( isLink.link, '' ) }
            Links={
                // web scraping is for weird nerds
                <a href={ isLink.link }>
                    { isLink.link }
                </a>
            } />
    )

    if( checkForLinks( v.content )?.image ) return (
        <div>
            {/* <img src={ checkForLinks( v.content ).image }/> */}
            <MessageType {...v}/>
        </div>
    )

    return (
        <MessageType {...v}/>
    )
}

export default DisplayMessage