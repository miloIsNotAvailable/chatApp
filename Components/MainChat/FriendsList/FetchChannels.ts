import { map, of, switchMap, Observable } from "rxjs"
import { fromFetch } from "rxjs/fetch"

type obsType = {
    loading: boolean;
    data: Promise<any>;
}

type FetchObservableType = {
    loading: boolean, 
    link: string
} 

export const getChannelQuery: 
(link: string, variables: any ) => Observable<obsType> 
= ( link: string, variables: any ) => {
    
    const fetcher: Observable<FetchObservableType> 
    = of( { loading: true, link } )
    const fetched: Observable<FetchObservableType> 
    = of( { loading: false, link } )

    return fetcher.pipe(
        switchMap( 
            ( { link, loading } ) => 
            fromFetch( link, { 
                method: "POST", 
                body: JSON.stringify( variables ) 
            } ).pipe(
                switchMap(
                    ( res ) => fetched.pipe(
                        map( () => ( { loading: !loading, data: res.json() } ) )
                    )
                )
            )
        )
    )
}
