import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
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

    fetch( '/api/create_channel', {
        method: "POST",
        body: JSON.stringify( { name, id } )
    } )
    .then( v => v.json() )
    .then( ( v ) => {
        console.log( v )
        // Dispatch( 
        //     createChannelFromData( { id, users } ) 
        // )
    } )
}
