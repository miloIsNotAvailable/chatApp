import { useEffect, useMemo, useState } from "react";
import { fromEvent, map, mergeMap, of } from "rxjs";
import { useUserInfo } from "../../../../constants/userConstants";
import { _io } from "../../../../constants/WebSocketsConstants";
import { MessageType } from "../../../../store/interfaces";
import { listenToFetch } from "./listenToFetch";
import { setPaginate } from "./setPaginate";

export type Msg = MessageType & { messageID: string }

export const usePagination = ( msgs: Msg[] ) => {

    const { channelID } = useUserInfo()

    const [ moreMsgs, setMoreMsgs ] = useState<any[]>( [] )

    // useEffect( () => console.log( moreMsgs ), [ moreMsgs ] )
    const handle = ( data: any ) => setMoreMsgs( prev => [ ...prev, ...data ] )

    const e = useMemo( () => listenToFetch( handle ), [] )
    const _setPaginate = ( msgs: any ) => setPaginate( { msgs, channelID, moreMsgs } )

    useEffect( () => {e}, [ moreMsgs, e ] )
    // reset everytime channelID changes (user switches channel they're in)
    useEffect( () => setMoreMsgs( [] ), [ channelID ] )

    return { more: moreMsgs, setPaginate: _setPaginate }
    }