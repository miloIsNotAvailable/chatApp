import { createContext, useContext } from "react";

export const settingsContext = createContext<string | null>( null )
export const SettingsContextProvider =settingsContext.Provider

export const useSettingsContext = () => {
    const context = useContext( settingsContext )

    return context
}