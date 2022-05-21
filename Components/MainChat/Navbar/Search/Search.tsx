import { ChangeEvent, ChangeEventHandler, FC, useCallback, useEffect, useMemo, useState } from "react";
import { styles } from "../Build/NavbarStyles";
import SearchIcon from '../../../../graphics/search.svg'
import Image from "next/image";
import { debounce } from "./debounce";
import { User } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";

const Search: FC = () => {

    const [ foundUser, setFoundUser ] = useState<User | null>( null )

    const handleChange = ( 
        e: ChangeEvent<HTMLInputElement> 
    ) => {
        fetch( '/api/find_user', {
            method: "POST",
            body: JSON.stringify( {"name": e.target.value} )
        } ).then( v => v.json() ).then( v => setFoundUser( v ) )
    }
    
    // @ts-nocheck
    const e = useCallback( debounce( handleChange, 200 ), [] )

    return (
        <div className={ styles.search_wrap }>
            <div className={ styles.search_display }>
                <Image src={ SearchIcon }
                className={ styles.search_icon }
                alt=""/>
                <input 
                    className={ styles.search }
                    placeholder={ 'search' } 
                    onChange={ ( d: any ) =>  e( d ) }/>
            </div>
            <AnimatePresence>
                {
                    foundUser && 
                    <motion.div 
                    className={ styles.show_user }
                    initial={ { height: 0 } }
                    animate={ { height: '5vw' } }
                    exit={ { height: 0, opacity: 0 } }>
                        <div className={ styles.user_profile }/>
                        { foundUser?.name }
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    )
}

export default Search