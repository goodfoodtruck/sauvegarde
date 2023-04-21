import { FunctionComponent, useState } from "react"
import { Link } from "react-router-dom"
import { SearchComponent } from "./SearchComponent"

export const HeaderComponent: FunctionComponent = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <div id="header" className={`absolute flex items-baseline justify-between md:justify-around top-0 z-10 w-full h-16 p-3 ${showMenu ? 'flex-wrap' : ''}`}>
            <Link to={"/"}>
                <h3 className="text-2xl font-bold text-white">Sauvegarde</h3>
            </Link>
            <button id="button" className="md:hidden font-sans font-bold float-right" onClick={() => setShowMenu(!showMenu)}>Menu</button>
            <div className={`w-screen p-2 md:w-auto md:block ${showMenu ? 'block' : 'hidden'}`}>
                <SearchComponent />
            </div>
        </div>
    )
}