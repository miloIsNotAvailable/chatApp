import { AnimatePresence, motion } from "framer-motion";
import { FC, useContext, useEffect, useState } from "react";
import { fromEvent, map, mergeMap, of } from "rxjs";
import { useUserInfo } from "../../../constants/userConstants";
import { _io } from "../../../constants/WebSocketsConstants";
import { setCallType } from "../../../interfaces/webRTCInterfaces";
import { styles } from "../ChatStyles";
// import EndCallIcon from '../../../../graphics/endCall.svg'
import { EndCallICon } from '../../../../graphics/endCall'
import Image from "next/image";
import { RTCConnection } from "../../../contexts/WebRTContext";

const DisplayCall: FC = () => {

    const { channelID } = useUserInfo()
    const[ call, setCall ] = useState<setCallType>( null )

    const pc = useContext( RTCConnection )

    const v = () => _io.pipe(
        mergeMap( 
            client => fromEvent( client, 'user-call-answered' )
            .pipe(
                map( data => data )
            )
        )
    ).subscribe( setCall )

    useEffect( () => { v() } )

    const handleCallEnd = () => {
        _io.pipe(
            mergeMap(
                client => of( client )
                .pipe( client => client )
            )
        ).subscribe( client => {
            client.emit( 'call-ended', { call: null, channelID } )
            pc?.close()

            _io.pipe(
                mergeMap( 
                    client => fromEvent( client, 'get-call-ended' )
                    .pipe( 
                        data => data
                     )
                )
            ).subscribe( data => setCall( data?.call ) )
        } )
    }

    if( !call ) return <motion.div
    initial={ { height: 0 } } 
    className={ styles.display_call_wrap }>
    <video className={ styles.webcam } id="webcam" playsInline autoPlay/>
    <video className={ styles.remote } id="remote" playsInline autoPlay/>
    </motion.div>

    return (
        <>
        <AnimatePresence>
            { 
            call.type === 'answer' && 
            call.channelID === channelID
            &&
            <motion.div
                initial={ { height: 0, overflow: 'hidden' } } 
                animate={ { height: '100%', overflow: 'visible' } } 
                exit={ { height: 0, overflow: 'hidden' } } 
                className={ styles.display_call_wrap }>
                    <div 
                        className={ styles.end_call_button }
                        onClick={ handleCallEnd }>
                        <EndCallICon/>
                    </div>
                <video 
                className={ styles.webcam } 
                id="webcam" 
                playsInline 
                autoPlay
                />
                <video 
                className={ styles.remote } 
                id="remote" 
                playsInline 
                autoPlay
                />
            </motion.div>
            }
        </AnimatePresence>
        </>
    )
} 

export default DisplayCall