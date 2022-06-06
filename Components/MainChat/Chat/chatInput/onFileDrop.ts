import { DragEvent, MutableRefObject } from "react";
import { setURLData } from "../../../store/getURLDataAsLink";
import { useAppDispatch } from "../../../store/hooks";

export const useFileDrop = ( editRef: MutableRefObject<HTMLDivElement | null> ) => {

    const dispatch = useAppDispatch()

    return ( e: DragEvent<HTMLDivElement> ) => {
        e.preventDefault()
        e.dataTransfer.getData( 'text/plain' )
        const file = e.dataTransfer.files[0]
        const img = new FileReader()

        img.onload = e => {
            if( !editRef.current ) return
            console.log(e.target?.result)
            editRef.current.innerHTML = `<img src="${ e.target?.result }" width="100" height="auto"/>`;
            dispatch( 
                setURLData( 
                    { 
                        URLData: e.target?.result, 
                        filename: file.name 
                    } 
                ) 
            )
        }

        console.log( file )
        img.readAsDataURL( file )
    }
    
}