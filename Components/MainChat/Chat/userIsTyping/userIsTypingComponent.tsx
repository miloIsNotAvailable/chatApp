import { AnimatePresence, motion } from "framer-motion";
import { FC, useEffect } from "react";
import { useUserInfo } from "../../../constants/userConstants";
import { styles } from "../ChatStyles";
import { useUserIsTyping } from "./userIsTyping";
import UserIsTypingAnimation from "./userIsTypingAnimation";
import UserIsTypingLayout from "./userIsTypingLayout";

const UserIsTyping: FC = () => {

    const { name, channelID } = useUserInfo()

    const typing = useUserIsTyping()
    useEffect( () => console.log( typing ), [ typing ] )
 return (
        <AnimatePresence>
        {
        typing.isTyping && 
        name !== typing.name && 
        typing.channelID === channelID  && 
        <UserIsTypingLayout>
            { 
                Array(3).fill( 1 ).map( 
                    ( n: number, ind: number ) => (
                        <UserIsTypingAnimation 
                            key={ ind }  
                            ind={ ind }
                        />
                    ) 
                )
            }
        </UserIsTypingLayout>
        }
        </AnimatePresence>
    )
}

export default UserIsTyping