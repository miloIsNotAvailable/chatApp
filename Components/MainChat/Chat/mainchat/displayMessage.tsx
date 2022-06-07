import { FC, useEffect, useState } from "react";
import { motion } from 'framer-motion'
import ReactMarkdown from "react-markdown";
import { styles } from "../ChatStyles";
import { parseColor } from "./parseColorToString";
import MessageType from "./getMessageType";
import { checkForLinks } from "./checkForLinks";
import Head from "next/head";
import Image from "next/image";

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

    if( isLink.link && !isLink.image ) return (
        <MessageType {...v} 
            content={ v.content.replace( isLink.link, '' ) }
            Links={
                // web scraping is for weird nerds
                <a href={ isLink.link }>
                    { isLink.link }
                </a>
            } />
    )

    if( isLink.image ) return (
        <div>
            <MessageType {...v}
            content={ v.content.replace( isLink.image, '' ) }
            Links={
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    alt=""
                    className={ styles.msg_link_img } 
                    src={ isLink.image }/>
            }
            />
        </div>
    )

    return (
        <MessageType {...v}/>
    )
}

export default DisplayMessage