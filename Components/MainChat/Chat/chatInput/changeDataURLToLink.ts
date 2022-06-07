import { useEffect, useState } from "react";
import { app } from "../../../constants/firebaseConstants";
import { useAppSelector } from "../../../store/hooks";
import { URLDataToLink } from "../../../store/interfaces";

type getURLDataType = { URLDataToLink: URLDataToLink }

export const useDataToLink = () => {

    // so firebase works
    app
    const [ { URLData, filename }, setLink ] = useState<URLDataToLink | any>( { 
        URLData: null, filename: null 
    } )

    const selector = useAppSelector( 
        ( { URLDataToLink }: getURLDataType ) => URLDataToLink 
    )

    useEffect( () => {
        
        setLink( selector )

    }, [ selector ] )
        

    return { URLData, filename }
}