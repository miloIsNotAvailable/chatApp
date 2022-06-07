import { KeyboardEvent } from "react"
import { evType } from "./evenTypes"

/**
 * check if 
 * an event is a keyboard event,
 * if so on enter submit
 */
 export const evIsKey = ( e: evType ): 
 e is KeyboardEvent<HTMLTextAreaElement> => {
     const c = e as KeyboardEvent<HTMLTextAreaElement>
 
     return (
         // check whether the event is 
         // a keyboard event
         typeof c.key === 'string' && 
         // do not submit when user presses 
         // a button other than enter
         c.key !== 'Enter' 
         // do not submit when 
         // user presses shift + enter
         || ( c.key === 'Enter' && c.shiftKey ) 
     )
 }