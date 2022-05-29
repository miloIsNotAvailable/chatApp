import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { map, mergeMap, of, switchMap } from "rxjs"
import { fromFetch } from "rxjs/fetch"
import { _io } from "../../../constants/WebSocketsConstants"
import { createChannelFromData } from "../../../store/createChannel"
import { U } from "../../../store/interfaces"

interface CreateChannelProps {
    name: ( string | undefined )[], 
    id: ( string | undefined )[], 
    Dispatch: ThunkDispatch<any, undefined, AnyAction>
}

export const CreateChannel = ( { 
        name, 
        id, 
        Dispatch
    }: CreateChannelProps ) => {

    Dispatch( 
        createChannelFromData( { users: [ "loading", 'loading' ], id: 'loading' } ) 
    )

    const newChannel = of( "" )
    newChannel.pipe(
        switchMap(
            () => fromFetch( "/api/create_channel", {
                method: "POST",
                body: JSON.stringify( { name, id } )        
            } ).pipe( 
                map( data => data )
             )
        )
    ).subscribe( async res => {
        if( !res.ok ) return

        const data = await res.json()
        console.log( data )
        
        _io.pipe( 
            mergeMap( 
                socket => of( { socket: socket, data } )
                .pipe( map( data => data )  ) 
            ) 
         ).subscribe( ( { socket, data } ) => socket.emit( 'new-channel', data ) )
        
         Dispatch( 
            createChannelFromData( data ) 
        )
    } )
}
