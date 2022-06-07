import { KeyboardEvent, MouseEvent } from "react";

export type evType = KeyboardEvent<HTMLTextAreaElement> | 
KeyboardEvent<HTMLDivElement> | 
MouseEvent<HTMLDivElement, globalThis.MouseEvent>
