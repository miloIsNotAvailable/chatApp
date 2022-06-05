import { DragEvent, MutableRefObject } from "react";

export const fileDrop = ( e: DragEvent<HTMLDivElement>, editRef: MutableRefObject<HTMLDivElement | null> ) => {

    e.preventDefault()
    e.dataTransfer.getData( 'text/plain' )
    const file = e.dataTransfer.files[0]
    const img = new FileReader()

    
    img.onload = e => {
        if( !editRef.current ) return
        console.log(e.target?.result)
        editRef.current.innerHTML = `<img src="${ e.target?.result }" width="100" height="auto"/>`;
    }

    console.log( file )
    console.log(img.readAsDataURL( file ))
}

export const useFileDrop = ( editRef: MutableRefObject<HTMLDivElement | null> ) => {

    return ( e: DragEvent<HTMLDivElement> ) => {
        e.preventDefault()
        e.dataTransfer.getData( 'text/plain' )
        const file = e.dataTransfer.files[0]
        const img = new FileReader()

        img.onload = e => {
            if( !editRef.current ) return
            console.log(e.target?.result)
            editRef.current.innerHTML = `<img src="${ e.target?.result }" width="100" height="auto"/>`;
        }

        console.log( file )
        img.readAsDataURL( file )
    }
    
}