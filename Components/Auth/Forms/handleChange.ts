import { RefObject } from "react"

export const handleChange = ( 
    formRef: RefObject<HTMLInputElement>["current"], 
    setRef: ( a: any ) => typeof a ) => {
    return () => setRef( formRef?.value )
}