import { Outlet } from "react-router-dom"
import { HeaderComponent } from "../components/HeaderComponent"

export const RootLayout = () => {
    return (
        <div id="root">
            <header>
                <HeaderComponent />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}