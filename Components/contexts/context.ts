import { createContext } from "react";

export const FormContext = createContext<{ defaultValue: any }>( { defaultValue: null } )