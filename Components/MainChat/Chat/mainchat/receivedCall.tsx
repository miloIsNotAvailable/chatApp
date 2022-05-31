import Image from "next/image";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { styles } from "../ChatStyles";
import CallIcon from '../../../../graphics/call.svg'
import { _io } from "../../../constants/WebSocketsConstants";
import { fromEvent, map, mergeMap } from "rxjs";
import { callUserTypes, setCallType } from "../../../interfaces/webRTCInterfaces";
import { useUserInfo } from "../../../constants/userConstants";
import { AnimatePresence, motion } from 'framer-motion'
import { answerCall } from "../../Navbar/Calls/createConnection";
import { useAppSelector } from "../../../store/hooks";
import { RTCPeerState } from "../../../store/interfaces";
import { RTCConnection } from "../../../contexts/WebRTContext";

const ReceivedCall: FC = () => {

    const [ call, setCall ] = useState<setCallType>( null )
    const [ offerCandidates, setOfferCandidates ] = useState<RTCIceCandidate | null>( null )
    const { channelID, name } = useUserInfo()

    const[ offer, setOffer ] = useState(  )

    const pc = useContext( RTCConnection )

     const m = () => _io.pipe(
        mergeMap( 
            client => fromEvent( client, 'call-from-user' )
            .pipe(
                map( data => data )
            )
        )
    ).subscribe( setCall )

    useEffect( () => { m() } )

     const n = () => _io.pipe(
        mergeMap( 
            client => fromEvent( client, 'get-offer-candidates' )
            .pipe(
                map( data => data )
            )
        )
    ).subscribe( setOfferCandidates )

    useEffect( () => { n() } )

    if( !call ) return <></>
    
    return (
        <>
        <AnimatePresence>
        { 
            call.name !== name && 
            call.channelID === channelID &&  
            <motion.div
                initial={ { height: 0 } } 
                animate={ { height: 'calc( var(--icon-size) * 7 + 2rem )' } } 
                exit={ { height: 0 } } 
                className={ styles.received_call_wrap }
                onClick={ () => answerCall( 
                    { channelID, name }, 
                    pc, 
                    call, 
                    offerCandidates 
                    ) }>
                <div className={ styles.wrap_call_icon }>
                <Image 
                    className={ styles.call_icon } 
                    src={ CallIcon }
                    alt=""
                    layout="fixed"/>
                </div>
                <div className={ styles.call_desc }>
                    { call.name } is starting a call
                </div>
            </motion.div>
        }
        </AnimatePresence>
        </>
    )
}

export default ReceivedCall