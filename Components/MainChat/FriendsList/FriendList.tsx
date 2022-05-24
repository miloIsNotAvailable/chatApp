import { Channel } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import { SessionRerouteContext } from "../../contexts/context";
import DisplayFriend from "./DisplayFriend";
import { styles } from "./FriendListStyles";

const FriendList: FC = () => {

    const sessionContext = useContext( SessionRerouteContext )

    const arr: Channel[] | null = sessionContext?.channels || null
    const[ selected, setSelected ] = useState<any | null>( arr ? arr[0]?.users[0] : null )
    
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

    console.log( arr )

    return (
        <div className={ styles.display_friend_list }>
            {
                arr && arr.map( ( { users, id }: Channel ) => (
                    <DisplayFriend 
                        redirectTo={ selected }
                        name={ users[0] }
                        key={ id } 
                        cssStyles={ 
                            selected === users[0] &&
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