import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../../../constants/firebaseConstants";
import { useUserInfo } from "../../../constants/userConstants";
import { useAppSelector } from "../../../store/hooks";
import { URLDataToLink } from "../../../store/interfaces";

type getURLDataType = { URLDataToLink: URLDataToLink }

export const useDataToLink = () => {

    // so firebase works
    app
    const storage = getStorage();
    const { channelID } = useUserInfo()

    const [ { URLData, filename }, setLink ] = useState<URLDataToLink | any>( { 
        URLData: null, filename: null 
    } )

    const [ getImageLink, setGetImageLink ] = useState<string | null>( null )

    const selector = useAppSelector( 
        ( { URLDataToLink }: getURLDataType ) => URLDataToLink 
    )

    useEffect( () => {
        setLink( selector )
    }, [ selector ] )

    const imgRef = ref( storage, `${channelID}/${ filename }` )
    
    return () => {
        uploadString( imgRef, URLData, 'data_url' )
        .then( ( e ) => {
            getDownloadURL( imgRef )
            .then( setGetImageLink )
        } )

        return getImageLink
    } 
}