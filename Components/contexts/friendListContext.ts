import { Channel } from "@prisma/client";
import { createContext, Dispatch, Provider, SetStateAction, useContext, useState } from "react";
import { SessionRerouteContext } from "./context";

export type selectedType = string | null
type contextType = {
    selected: selectedType
    setSelected: Dispatch<SetStateAction<selectedType>>
}

type useFriendListContextType<T=any> = () => {
    selected: T extends selectedType ? T : selectedType
    setSelected: Dispatch<SetStateAction<selectedType>>;
    FriendListContext: Provider<contextType>;
}
export const FriendListContext = createContext<contextType>( {
    selected: null, 
    setSelected: () => {}
} )

export const useFriendListContext: 
useFriendListContextType = () => {

    const sessionContext = useContext( SessionRerouteContext )

    const arr: Channel[] | null = sessionContext?.channels || null
    const [ selected, setSelected ] = useState<selectedType>( arr ? arr[0]?.id : null )


    const context = useContext( FriendListContext )

    return { 
        FriendListContext: FriendListContext.Provider, 
        ...context
    }
}
