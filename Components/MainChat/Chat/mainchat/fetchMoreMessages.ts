import { map, mergeMap, of } from "rxjs"
import { fromFetch } from "rxjs/fetch"

export const fetchMoreMsgs = ( data: any ) => {
    return of( data ).pipe( 
        mergeMap( 
            data => fromFetch( '/api/fetch_more', {
                method: 'POST',
                body: JSON.stringify( {...data} )
            } ).pipe(
                map( res => res )
            )
        )
    )
}