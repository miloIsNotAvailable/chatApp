import { 
    getStorage, 
    ref, 
    getDownloadURL, 
    listAll 
} from "firebase/storage";

import { useCallback, useEffect, useState } from "react";
import { app } from "../../../constants/firebaseConstants";
import { useUserInfo } from "../../../constants/userConstants";
import { useAppSelector } from "../../../store/hooks";
import { isOpenType } from "./DisplayMenu";

export const useChannelImages = () => {

    const selector = useAppSelector( ( { galleryOpen }: isOpenType ) => galleryOpen?.open )

    const[ imgLinks, setImgLinks ] = useState<string[] | null>( null )
    const { channelID } = useUserInfo()

    const storage = getStorage()
    const channelImgsRef = ref( storage, `${channelID}` )

    const handle = ( prev: string[] | null, links: any ) => prev ? [ ...prev, links ] : [ links ]
    const e = useCallback( handle, [] )

    useEffect( () => {
        
        if( !selector ) {
            setImgLinks( null ) 
            return
        }

        ( async _ => {
            const channelStorage = await listAll( channelImgsRef )
            console.log( channelStorage )

            channelStorage.items.forEach( async res => {
                console.log( res?.name )
                const links = await getDownloadURL( ref( storage, `${channelID}/${res.name}` ) )
                setImgLinks( prev => e( prev, links ) )
            } )
        } )()
        console.log( selector )
        
    }, [channelID, selector] )
    
    return imgLinks
}