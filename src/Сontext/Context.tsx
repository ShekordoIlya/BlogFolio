import { createContext } from "react";
import { IActiveContext, IThemeContext } from "../types/types";

export const MyContext = createContext("");
export const Obj = createContext({});

export const ActiveContext = createContext<IActiveContext | null>(null);
export const ThemeContext = createContext<IThemeContext | null>(null);
