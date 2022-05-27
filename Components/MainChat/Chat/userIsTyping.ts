import { useEffect, useMemo, useState } from "react";
import { debounce, fromEvent, interval, map, mergeMap, of } from "rxjs";
import { _io } from "../../constants/WebSocketsConstants";

export const useUserIsTyping = () => {
    const [ isTyping, setUserIsTyping ] = useState( false )

    const checkIfUserIsTyping = () => {
        const checkForAction = _io.pipe(
            mergeMap( 
                ( socket ) => fromEvent( socket, 'user-is-typing' )
                .pipe(
                    // debounce( () => interval( 500 ) ),
                    map( ( { data } ) => data )
                )
            )
        )
    
        const stoppedTyping = checkForAction.pipe(
            debounce( () => interval( 1000 ) ),
            mergeMap( 
                data => of( data )
                .pipe( 
                    map( ( data ) => !data ),
                 ) 
            )
        )

        checkForAction.subscribe( setUserIsTyping )
        stoppedTyping.subscribe( setUserIsTyping )
    }

    const v = useMemo( () =>  checkIfUserIsTyping(), [] )
    useEffect( () => v )

    return isTyping
}