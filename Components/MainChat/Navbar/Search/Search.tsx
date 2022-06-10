import { 
    ChangeEvent, 
    FC, 
    useCallback, 
    useContext, 
    useEffect, 
    useRef, 
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
import { useCreateChannel } from "./CreateChannel";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Observable } from "rxjs";
import { ObservableType, U } from "../../../store/interfaces";
import { getChannelQuery, useFetch } from "../../FriendsList/FetchChannels";
import { useUserInfo } from "../../../constants/userConstants";

type StateObservable = {
    observer: ObservableType
}

type State = { newChannel: ObservableType }

const Search: FC = () => {

    const [ foundUser, setFoundUser ] = useState<User[] | null>( null )
    const inputRef = useRef<HTMLInputElement | null>( null )
    const { name } = useUserInfo()

    const [ loading, setLoading ] = useState( false )

    const handleChange = ( 
        e: ChangeEvent<HTMLInputElement> 
    ) => {
        setLoading( true )
        fetch( '/api/find_user', {
            method: "POST",
            body: JSON.stringify( {"name": e.target.value, 'currUser': name} )
        } ).then( v => v.json() ).then( v => {
            setFoundUser( v )
            setLoading( false )
        } )
    }

    const selector = useAppSelector( ( state: State ) => state?.newChannel )

    useEffect( () => {
        selector?.users && console.log( selector )
    }, [ selector ] )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const e = useCallback( debounce( handleChange, 200 ), [] )

    const sessionContext = useContext( SessionRerouteContext )
    const createChannel = useCreateChannel()

    if( loading ) return (
        <div className={ styles.search_wrap }>
        <div className={ styles.search_display }>
            <Image src={ SearchIcon }
            className={ styles.search_icon }
            alt=""/>
            <input 
                className={ styles.search }
                placeholder={ 'search' }
                ref={ inputRef }
                onChange={ ( d: any ) =>  e( d ) }/>
        </div>
        <div className={ styles.show_user_wrap }>
            <AnimatePresence>
                <DisplayFoundUser 
                    ind={ 0 }
                    key={ 'loading' } 
                    name={ 'loading' } 
                    isLoading={ loading }
                    handleClick={ () => {} }
                />
            </AnimatePresence>
        </div>
    </div>
    )

    return (
        <div className={ styles.search_wrap }>
            <div className={ styles.search_display }>
                <Image src={ SearchIcon }
                className={ styles.search_icon }
                alt=""/>
                <input 
                    className={ styles.search }
                    placeholder={ 'search' }
                    ref={ inputRef }
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
                                isLoading={ loading }
                                handleClick={ () => 
                                    createChannel( { 
                                    name: [name, sessionContext?.user?.name], 
                                    id: [ id, sessionContext?.user?.id ], 
                                    } ) 
                                }
                            />
                        ) ) 
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Search