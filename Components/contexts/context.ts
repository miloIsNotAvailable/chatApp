import { createContext } from "react";
import { SessionProps } from "../interfaces/mainchatInterfaces";

export const SessionContext 
= createContext<SessionProps>( null )