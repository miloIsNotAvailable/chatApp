import { gql, useMutation, useSubscription } from "@apollo/client";
import { FC, useContext } from "react";
import { SessionContext } from "../../contexts/context";
import Chat from "../Chat/Chat";
import FriendList from "../FriendsList/FriendList";
import Navbar from "../Navbar";
import Settings from "../Settings/Settings";
import { styles } from "./MainChatStyles";

const SUB = gql`
    subscription Subscription {
  updateMessages {
    id
    content
    from
    channel
  }
}
`

const MUT = gql`
    mutation Mutation($messageId: String, $content: String, $from: String, $channel: String) {
  message(id: $messageId, content: $content, from: $from, channel: $channel) {
    id
    content
    from
    channel
  }
}
`

const BuildMainChat: FC = () => {
    
    /**
     * @param sessionContext
     * @returns a jwt session token 
     * containing email, id and username 
     */

    const sessionContext = useContext( SessionContext )

    return (
        <div className={ styles.mainchat_display }>
            <Navbar/>
            <div className={ styles.mainchat_body }>
                <div className={ styles.sidebar }>
                    <FriendList/>
                    <Settings/>
                </div>
                <Chat/>
            </div>
        </div>
    )
}

export default BuildMainChat