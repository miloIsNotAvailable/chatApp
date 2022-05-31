import Image from "next/image";
import { FC, useCallback, useEffect, useState } from "react";
import { styles } from "../ChatStyles";
import CallIcon from '../../../../graphics/call.svg'
import { _io } from "../../../constants/WebSocketsConstants";
import { fromEvent, map, mergeMap } from "rxjs";
import { callUserTypes } from "../../../interfaces/webRTCInterfaces";
import { useUserInfo } from "../../../constants/userConstants";
import { AnimatePresence, motion } from 'framer-motion'

type callType = callUserTypes & RTCSessionDescriptionInit
type setCallType = callType | null

const ReceivedCall: FC = () => {

    const [ call, setCall ] = useState<setCallType>( null )
    const { channelID } = useUserInfo()

     const m = () => _io.pipe(
        mergeMap( 
            client => fromEvent( client, 'call-from-user' )
            .pipe(
                map( data => data )
            )
        )
    ).subscribe( setCall )

    useEffect( () => { m() } )

    if( !call ) return <></>

    return (
        <>
        <AnimatePresence>
        { 
            call.channelID === channelID &&  
            <motion.div className={ styles.received_call_wrap }>
                <div className={ styles.wrap_call_icon }>
                <Image 
                    className={ styles.call_icon } 
                    src={ CallIcon }
                    alt=""
                    layout="fixed"/>
                </div>
                <div className={ styles.call_desc }>
                    user is calling...
                </div>
            </motion.div>
        }
        </AnimatePresence>
        </>
    )
}

export default ReceivedCall