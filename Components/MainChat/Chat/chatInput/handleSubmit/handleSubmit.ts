import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage"
import { KeyboardEvent, MouseEvent, MutableRefObject, useContext, useEffect, useRef, useState } from "react"
import { map, mergeMap, Observable, of } from "rxjs"
import { useUserInfo } from "../../../../constants/userConstants"
import { _io } from "../../../../constants/WebSocketsConstants"
import { SessionReroute, SessionRerouteContext } from "../../../../contexts/context"
import { newMessage } from "../../../../store/createMessage"
import { setURLData } from "../../../../store/getURLDataAsLink"
import { useAppDispatch, useAppSelector } from "../../../../store/hooks"
import { URLDataToLink } from "../../../../store/interfaces"
import { useDataToLink } from "../changeDataURLToLink"
import { inputRefDefault, triggerSubmit } from "./checkIfSubmitIsTriggered"
import { evType } from "./evenTypes"

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
    const [ inputString, setGetInputString ] = useState<string | null>( null )

    const urlRef = useRef<string | null>( null )

    const IdObservable: Observable<SessionReroute | null> 
    = of( sessionContext?.id )

    const storage = getStorage();
    const { channelID } = useUserInfo()

    if( URLData ) return ( e ) => {
        if( triggerSubmit<evType, T>( e, inputRef ) ) return
        
        
        ( async() => {
            
            urlRef.current = inputRef.current.innerText.trim()

            dispatch( newMessage( {
                channelID: channelID, 
                content: urlRef.current ? urlRef.current : "",
                from: name ? name : "",
                messageID: 'xxxxxxxxxx'.replace( /x/g, String.fromCharCode(65 + Math.floor(Math.random() * 60)) )
            } ) )

            if( inputRef.current ) inputRef.current.innerText = ''
            console.log( urlRef.current )

            const imgRef = ref( storage, `${channelID}/${ filename }` )
            
            const e = await uploadString( imgRef, URLData, 'data_url' )
            const link = await getDownloadURL( imgRef )

            return link + " " + urlRef.current
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

            dispatch( newMessage( {
                channelID: "", 
                content: "",
                from: "",
                messageID: ""
            } ) )

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
                    content: link,
                    from: name
                } )
            } )
    
            // socket.emit( 'message', inputRef.current?.value?.trim() )
                    
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
            socket.emit( 'pm', { 
                channelID: data, 
                content: inputRef.current?.innerText?.trim(),
                from: name
            } )
        } )
        console.log( inputRef.current?.innerText?.trim() )
        // socket.emit( 'message', inputRef.current?.value?.trim() )
    
        // dispatch( newMessage( { content: inputRef.current?.innerText.trim() , channelID: '' } ) )
        
        if( inputRef.current ) inputRef.current.innerText = ''
        inputRef.current.style.height = 'auto'
        
        setTimeout( () => {
            const mainchat = document.getElementById( 'mainchat' )
            mainchat?.scrollTo( 0, mainchat?.scrollHeight )
        }, 300 )
    }

}