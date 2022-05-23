import { 
    ChangeEvent, 
    FC, 
    useCallback, 
    useContext, 
    useEffect, 
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
import { CreateChannel } from "./CreateChannel";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Observable } from "rxjs";
import { ObservableType, U } from "../../../store/interfaces";

type StateObservable = {
    observer: ObservableType
}

type State = { newChannel: ObservableType }

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

    const selector = useAppSelector( ( state: State ) => state?.newChannel )

    useEffect( () => {
        console.log( selector )
    }, [ selector ] )

    // @ts-nocheck
    const e = useCallback( debounce( handleChange, 200 ), [] )

    const sessionContext = useContext( SessionRerouteContext )
    const dispatch = useAppDispatch() 

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
                                handleClick={ () => 
                                    CreateChannel( { 
                                    name: [name, sessionContext?.user?.name], 
                                    id: [ id, sessionContext?.user?.id ], 
                                    Dispatch: dispatch } 
                                ) }
                            />
                        ) ) 
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Search