import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage"
import { KeyboardEvent, MouseEvent, MutableRefObject, useContext, useEffect, useState } from "react"
import { map, mergeMap, Observable, of } from "rxjs"
import { useUserInfo } from "../../../constants/userConstants"
import { _io } from "../../../constants/WebSocketsConstants"
import { SessionReroute, SessionRerouteContext } from "../../../contexts/context"
import { newMessage } from "../../../store/createMessage"
import { setURLData } from "../../../store/getURLDataAsLink"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { URLDataToLink } from "../../../store/interfaces"
import { useDataToLink } from "./changeDataURLToLink"

type evType = KeyboardEvent<HTMLTextAreaElement> | KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement, globalThis.MouseEvent>

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

type getURLDataType = { URLDataToLink: URLDataToLink }

/**
 * check if 
 * an event is a keyboard event,
 * if so on enter submit
 */
export const evIsKey = ( e: evType ): 
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

export function triggerSubmit
// T is there just in case, 
// S extends the input ref type 
// based on type given 
// in the useSubmit type 
<T extends evType, S extends inputRefDefault>
( c: T, s: S ): c is T & { s: S }
{
    const input = s as S || s as inputRefDefault<HTMLDivElement>
    const e = c as evType

    /**
     * return truthy if 
     * the input is not null
     * and user pressed enter 
     * or the send button
     */
    return !input.current?.innerText.trim() || ( evIsKey( e ) && !evIsMouse( e ) )
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

    const { URLData, filename } = useDataToLink()
    const [ getNewImageLink, setGetImageLink ] = useState<string | null>( null )

    const IdObservable: Observable<SessionReroute | null> 
    = of( sessionContext?.id )

    const storage = getStorage();
    const { channelID } = useUserInfo()

    if( URLData ) return ( e ) => {
        if( triggerSubmit<evType, T>( e, inputRef ) ) return
        
        
        ( async() => {
            const imgRef = ref( storage, `${channelID}/${ filename }` )
            
            const e = await uploadString( imgRef, URLData, 'data_url' )
            const link = await getDownloadURL( imgRef )

            return link
        } )().then( ( link ) => {
            dispatch( 
                setURLData( 
                    { 
                        URLData: null, 
                        filename: null 
                    } 
                ) 
            )  
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
                    content: link + " " + inputRef.current?.innerText?.trim(),
                    from: name
                } )
            } )
    
            // socket.emit( 'message', inputRef.current?.value?.trim() )
        
            dispatch( newMessage( { content: inputRef.current?.innerText.trim() , channelID: '' } ) )
            
            if( inputRef.current ) inputRef.current.innerText = ''
            inputRef.current.style.height = 'auto'
            
            setTimeout( () => {
                const mainchat = document.getElementById( 'mainchat' )
                mainchat?.scrollTo( 0, mainchat?.scrollHeight )
            }, 300 )
        })


    }

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
                content: inputRef.current?.innerText?.trim(),
                from: name
            } )
        } )

        // socket.emit( 'message', inputRef.current?.value?.trim() )
    
        dispatch( newMessage( { content: inputRef.current?.innerText.trim() , channelID: '' } ) )
        
        if( inputRef.current ) inputRef.current.innerText = ''
        inputRef.current.style.height = 'auto'
        
        setTimeout( () => {
            const mainchat = document.getElementById( 'mainchat' )
            mainchat?.scrollTo( 0, mainchat?.scrollHeight )
        }, 300 )
    }

}