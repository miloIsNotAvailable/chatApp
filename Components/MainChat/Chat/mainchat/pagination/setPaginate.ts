import { fromEvent, map, mergeMap, of } from "rxjs";
import { _io } from "../../../../constants/WebSocketsConstants";
import { Msg } from "./usePagination";

type setPaginateType = {
    msgs: Msg[], 
    channelID: any, 
    moreMsgs: Msg[]
}

export const setPaginate = ( 
    { msgs, channelID, moreMsgs }: setPaginateType 
) => {
    _io.pipe(
        mergeMap(
            client => of( {  
                msgsLength: [...msgs, ...moreMsgs].length, 
                channelID 
            } )
            .pipe( 
                map( data => ( { client, data } ))
             )
        )
    ).subscribe( ( { client, data } ) => {
        
        ( async() => {
            client.emit( 'query-more', data )
        } )()
    } )
}