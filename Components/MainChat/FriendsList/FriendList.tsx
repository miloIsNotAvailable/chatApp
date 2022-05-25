import { Channel } from "@prisma/client";
import { FC, useContext, useEffect, useState } from "react";
import { of } from "rxjs";
import { _io } from "../../constants/WebSocketsConstants";
import { SessionRerouteContext } from "../../contexts/context";
import DisplayFriend from "./DisplayFriend";
import { displayFriendName } from "./displayFriendName";
import { styles } from "./FriendListStyles";
import { joinRoomOnClick } from "./joinRoomOnClick";

const FriendList: FC = () => {

    const sessionContext = useContext( SessionRerouteContext )

    const arr: Channel[] | null = sessionContext?.channels || null
    const[ selected, setSelected ] = useState<string | null>( arr ? arr[0]?.id : null )

    const e = of( selected )

    // join the room on click
    useEffect( () => {

        joinRoomOnClick( e )
    }, [ e, selected ] )

    // // query data client-side
    // const queryData = () => {
    //     fetch( '/api/get_channels', {
    //         method: "POST",
    //         body: JSON.stringify( sessionContext )
    //     } )
    //     .then( v => v.json() )
    //     .then( v => console.log( v ) )
    // }

    // console.log( sessionContext?.channels )

    // // memoize queried data
    // const e = useCallback( queryData, [] )
    // useEffect( () => e )
    const currentUsername = sessionContext?.user?.name

    return (
        <div className={ styles.display_friend_list }>
            {
                arr && arr.map( ( { users, id }: Channel ) => (
                    <DisplayFriend 
                        redirectTo={ id }
                        name={ displayFriendName( users, currentUsername ) }
                        key={ id } 
                        cssStyles={ 
                            selected === id &&
                            { 
                                backgroundColor: "var(--dark)"
                            }
                         }
                        handleClick={ setSelected }/>
                ) )
            }
        </div>
    )
}

export default FriendList