import { useState } from "react"
import { Outlet } from "react-router-dom"
import { HeaderComponent } from "../components/HeaderComponent"
import { AuthContext } from "../contexts/AuthContext"
import { useAuthenticated } from "../hooks/useAuthenticated"

export const RootLayout = () => {
    const [isConnected, setIsConnected] = useState(useAuthenticated());
    const value = { isConnected, setIsConnected };

    return (
        <div id="root">
            <AuthContext.Provider value={value}>
                <header>
                    <HeaderComponent />
                </header>
                <main>
                    <Outlet />
                </main>
            </AuthContext.Provider>
        </div>
    )
}