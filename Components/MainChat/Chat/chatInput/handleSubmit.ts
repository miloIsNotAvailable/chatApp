import { KeyboardEvent, MouseEvent, MutableRefObject, useContext } from "react"
import { map, mergeMap, Observable, of } from "rxjs"
import { useUserInfo } from "../../../constants/userConstants"
import { _io } from "../../../constants/WebSocketsConstants"
import { SessionReroute, SessionRerouteContext } from "../../../contexts/context"
import { newMessage } from "../../../store/createMessage"
import { useAppDispatch } from "../../../store/hooks"

type evType = KeyboardEvent<HTMLTextAreaElement> | MouseEvent<HTMLDivElement, globalThis.MouseEvent>

/**
 * check if 
 * an event is a mouse event,
 *  if so on click it'll return true
 */
const evIsMouse = ( e: evType ): 
e is MouseEvent<HTMLDivElement> => {
    let c = e as MouseEvent<HTMLDivElement>
    return typeof c.pageX === 'number'
}

/**
 * check if 
 * an event is a keyboard event,
 * if so on enter submit
 */
const evIsKey = ( e: evType ): 
e is KeyboardEvent<HTMLTextAreaElement> => {
    const c = e as KeyboardEvent<HTMLTextAreaElement>

    return (
        // check whether the event is 
        // a keyboard event
        typeof c.key === 'string' && 
        // do not submit when user presses 
        // a button other than enter
        c.key !== 'Enter' 
        // do not submit when 
        // user presses shift + enter
        || ( c.key === 'Enter' && c.shiftKey ) 
    )
}

type inputRefDefault<T=any> = MutableRefObject<T>

/**
 * 
 * @param c is a keyboard or mouse event
 * @param s is an input
 * @returns truthy if user
 * has clicked enter or the send button 
 * in any other case this will return falsy
 */

function triggerSubmit
// T is there just in case, 
// S extends the input ref type 
// based on type given 
// in the useSubmit type 
<T extends evType, S extends inputRefDefault>
( c: T, s: S ): c is T & { s: S }
{
    const input = s as S
    const e = c as evType

    /**
     * return truthy if 
     * the input is not null
     * and user pressed enter 
     * or the send button
     */
    return !input.current?.value?.trim() || ( evIsKey( e ) && !evIsMouse( e ) )
}
/**
 * 
 * @param inputRef is the 
 * input passed via ref
 * @returns a submit function that 
 * emits the result to a socket 
 */
export function useSubmit
<T extends inputRefDefault>
( inputRef: T ): ( e: evType ) => void {
    
    const sessionContext = useContext( SessionRerouteContext )
    const { name } = useUserInfo()

    const dispatch = useAppDispatch()
    const IdObservable: Observable<SessionReroute | null> 
    = of( sessionContext?.id )

    return ( e ) => {
        if( triggerSubmit<evType, T>( e, inputRef ) ) return
        
        e.preventDefault()

        const m = _io.pipe( 
            mergeMap( 
                socket => IdObservable.pipe(
                    map( data => ( { socket, data } ) )
                ) 
            )
        )
    
        m.subscribe( ( { data, socket } ) => {
            console.log( data )
            socket.emit( 'pm', { 
                channelID: data, 
                content: inputRef.current?.value?.trim(),
                from: name
            } )
        } )
    
        // socket.emit( 'message', inputRef.current?.value?.trim() )
    
        dispatch( newMessage( { content: inputRef.current?.value?.trim(), channelID: '' } ) )
        
        if( inputRef.current ) inputRef.current.value = ''
        inputRef.current.style.height = 'auto'
        
        setTimeout( () => {
            const mainchat = document.getElementById( 'mainchat' )
            mainchat?.scrollTo( 0, mainchat?.scrollHeight )
        }, 300 )
    }

}