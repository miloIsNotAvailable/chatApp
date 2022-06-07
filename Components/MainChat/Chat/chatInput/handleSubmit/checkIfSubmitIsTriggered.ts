import { MutableRefObject } from "react"
import { evIsKey } from "./checkFoKeyboardEvents"
import { evIsMouse } from "./checkForMouseEvents"
import { evType } from "./evenTypes"

export type inputRefDefault<T=any> = MutableRefObject<T>

/**
 * 
 * @param c is a keyboard or mouse event
 * @param s is an input
 * @returns truthy if user
 * has clicked enter or the send button 
 * in any other case this will return falsy
 */

export function triggerSubmit
// T is there just in case, 
// S extends the input ref type 
// based on type given 
// in the useSubmit type 
<T extends evType, S extends inputRefDefault>
( c: T, s: S ): c is T & { s: S }
{
    const input = s as S || s as inputRefDefault<HTMLDivElement>
    const e = c as evType

    /**
     * return truthy if 
     * the input is not null
     * and user pressed enter 
     * or the send button
     */
    return !input.current?.innerText.trim() || ( evIsKey( e ) && !evIsMouse( e ) )
}