import { 
    ChangeEvent, 
    FC, 
    useCallback, 
    useContext, 
    useState 
} from "react";

import { styles } from "../Build/NavbarStyles";
import SearchIcon from '../../../../graphics/search.svg'
import Image from "next/image";

import { debounce } from "./debounce";
import { User } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import DisplayFoundUser from "./displayFoundUsers";
import { SessionRerouteContext } from "../../../contexts/context";

const Search: FC = () => {

    const [ foundUser, setFoundUser ] = useState<User[] | null>( null )

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

    const sessionContext = useContext( SessionRerouteContext )

    const createChannel = ( { name, id }: { name: string[] | any, id: string } ) => {
        fetch( '/api/create_channel', {
            method: "POST",
            body: JSON.stringify( { name, id } )
        } )
        .then( v => v.json() )
        .then( v => console.log( v ) )
    }


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
            <div className={ styles.show_user_wrap }>
                <AnimatePresence>
                    {
                        foundUser &&
                        foundUser.map( ( 
                            { name, id }: User, ind: number
                            ) => (
                            <DisplayFoundUser 
                                ind={ ind }
                                key={ name } 
                                name={ name } 
                                handleClick={ () => createChannel( { name: [name, sessionContext?.user?.name], id } ) }
                            />
                        ) ) 
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Search