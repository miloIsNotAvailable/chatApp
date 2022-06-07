import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useEffect, useState } from "react";
import { app } from "../../../constants/firebaseConstants";
import { useUserInfo } from "../../../constants/userConstants";
import { setURLData } from "../../../store/getURLDataAsLink";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
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
    const [ updateLink, setUpdateLink ] = useState<string | null>( null )

    const selector = useAppSelector( 
        ( { URLDataToLink }: getURLDataType ) => URLDataToLink 
    )

    const dispatch = useAppDispatch()

    const imgRef = URLData ? ref( storage, `${channelID}/${ filename }` ) : null

    useEffect( () => {
        
        setLink( selector )

    }, [ selector ] )
        

    return { URLData, filename }
}