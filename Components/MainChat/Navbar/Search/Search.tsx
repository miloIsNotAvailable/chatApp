import { FC } from "react";
import { styles } from "../Build/NavbarStyles";
import SearchIcon from '../../../../graphics/search.svg'
import Image from "next/image";

const Search: FC =() => {

    return (
        <div className={ styles.search_display }>
            <Image src={ SearchIcon }
            className={ styles.search_icon }
            alt=""/>
            <input 
                className={ styles.search }
                placeholder={ 'search' } />
        </div>
    )
}

export default Search