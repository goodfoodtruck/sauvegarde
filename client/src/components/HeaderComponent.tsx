import { FunctionComponent, useContext, useState } from "react"
import { Link } from "react-router-dom"
import { SearchComponent } from "./SearchComponent"
import { AuthContext } from "../contexts/AuthContext"

export const HeaderComponent: FunctionComponent = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const authContext = useContext(AuthContext);

    return (
        <div id="header" className={`absolute flex items-baseline justify-between md:justify-around top-0 z-10 w-full h-16 p-3 ${showMenu ? 'flex-wrap' : ''}`}>
            <Link to={"/"}>
                <h3 className="text-2xl font-bold text-white">Sauvegarde</h3>
            </Link>
            <button id="button" className="md:hidden font-sans float-right" onClick={() => setShowMenu(!showMenu)}>Menu</button>
            <div className={`w-screen md:w-auto md:flex items-center mt-4 md:mt-0 ${showMenu ? 'block' : 'hidden'}`}>
                <SearchComponent />
                {authContext.isConnected ?
                    (<h4 className="px-4 font-sans">mon compte</h4>)
                    :
                    (<Link to={"/login"}>
                        <h4 id="button" className="w-64 md:w-auto mx-auto my-4 md:mx-4 md:my-0 text-center font-sans cursor-pointer">Log in</h4>
                    </Link>)
                }
            </div>
        </div>
    )
}