import { ChangeEvent, ChangeEventHandler, FC, useCallback, useEffect, useMemo } from "react";
import { styles } from "../Build/NavbarStyles";
import SearchIcon from '../../../../graphics/search.svg'
import Image from "next/image";

const debounce = (fn: any, delay: number) => {
    let timerId: any;
    return (...args: any) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), delay);
    }
  };
const Search: FC = () => {

    const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {

        fetch( '/api/find_user', {
            method: "POST",
            body: JSON.stringify( {"name": e.target.value} )
        } ).then( v => v.json() ).then( v => console.log( v ) )
    }
    
    const e = useCallback( debounce( handleChange, 200 ), [] )

    return (
        <div className={ styles.search_display }>
            <Image src={ SearchIcon }
            className={ styles.search_icon }
            alt=""/>
            <input 
                className={ styles.search }
                placeholder={ 'search' } 
                onChange={ ( d: any ) =>  e( d ) }/>
        </div>
    )
}

export default Search