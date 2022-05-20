import { FC, useEffect, useState } from "react";
import DisplayFriend from "./DisplayFriend";
import { styles } from "./FriendListStyles";

const FriendList: FC = () => {

    const arr = [ "hello", "hey", "hi", "hallo" ]
    const[ selected, setSelected ] = useState( arr[0] )

    return (
        <div className={ styles.display_friend_list }>
            {
                arr.map( ( v: any ) => (
                    <DisplayFriend 
                        name={ v }
                        key={ v } 
                        cssStyles={ 
                            selected === v &&
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