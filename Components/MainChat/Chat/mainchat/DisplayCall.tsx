import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { fromEvent, map, mergeMap } from "rxjs";
import { useUserInfo } from "../../../constants/userConstants";
import { _io } from "../../../constants/WebSocketsConstants";
import { setCallType } from "../../../interfaces/webRTCInterfaces";
import { styles } from "../ChatStyles";

const DisplayCall: FC = () => {

    const { channelID } = useUserInfo()
    const[ call, setCall ] = useState<setCallType>( null )

    const v = () => _io.pipe(
        mergeMap( 
            client => fromEvent( client, 'user-call-answered' )
            .pipe(
                map( data => data )
            )
        )
    ).subscribe( setCall )

    useEffect( () => { v() } )

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
                    <div className={ styles.end_call_button }>

                    </div>
                <video 
                className={ styles.webcam } 
                id="webcam" 
                playsInline 
                autoPlay
                onVolumeChangeCapture={ () => console.log( 'heyeye' ) }/>
                <video 
                className={ styles.remote } 
                id="remote" 
                playsInline 
                autoPlay
                onVolumeChangeCapture={ () => console.log( 'heyeye' ) }/>
            </motion.div>
            }
        </AnimatePresence>
        </>
    )
} 

export default DisplayCall