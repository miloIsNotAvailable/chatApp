import { Channel } from "@prisma/client";
import { useContext, useEffect, useMemo, useState } from "react";
import { map, of, switchMap, Observable } from "rxjs"
import { fromFetch } from "rxjs/fetch"
import { SessionRerouteContext } from "../../contexts/context";

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

type useFetchType = <T=any>(link: string, variables: any) => {channels: T | any}

export const useFetch: useFetchType
= <T=any>( link: string, variables: any ): { channels: T | null } => {

    const [ channels, setChannels ] = useState<T | null>( null )

    const f = getChannelQuery( link, variables )
    const handle = () => {
        f.subscribe( async( { data, loading } ) => {
            if( loading ) return 
            const res = await data
            return setChannels( res )
        } )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const v = useMemo( handle, [] )
 
    useEffect( () => { v; console.log( channels ) }, [ channels ] )

    return { channels }
}
