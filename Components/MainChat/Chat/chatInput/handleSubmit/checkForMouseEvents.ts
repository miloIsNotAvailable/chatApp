import { MouseEvent } from "react"
import { evType } from "./evenTypes"

/**
 * check if 
 * an event is a mouse event,
 *  if so on click it'll return true
 */
 export const evIsMouse = ( e: evType ): 
 e is MouseEvent<HTMLDivElement> => {
     let c = e as MouseEvent<HTMLDivElement>
     return typeof c.pageX === 'number'
 }
 