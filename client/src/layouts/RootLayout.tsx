import { Outlet } from "react-router-dom"

export const RootLayout = () => {
    return (
        <div id="root">
            <main>
                <Outlet />
            </main>
        </div>
    )
}