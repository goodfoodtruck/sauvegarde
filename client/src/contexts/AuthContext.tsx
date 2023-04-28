import { createContext } from "react"

export const AuthContext = createContext({
    isConnected: false,
    setIsConnected: (isConnected: boolean) => {}
});