import { MutableRefObject } from "react"
import { map, mergeMap, of } from "rxjs"
import { useUserInfo } from "../../../constants/userConstants"
import { _io } from "../../../constants/WebSocketsConstants"

export const useEmitOnChange = ( 
    inputRef: MutableRefObject<HTMLDivElement | null> 
) => {
    
    const userIsTyping = of( 'is-typing' )
    const { channelID, name } = useUserInfo()

    return () => {
        if( !inputRef.current ) return
    
        const m = _io.pipe(
            mergeMap( 
                ( socket ) => userIsTyping
                .pipe(
                    map( data => ( { data, socket } ) )
                )
             )
        )
    
        m.subscribe( ( { data, socket } ) => {
            socket.emit( data, { name, isTyping: true, channelID } )
        } )
    }

}