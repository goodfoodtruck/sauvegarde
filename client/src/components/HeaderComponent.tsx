import { FunctionComponent, useContext, useState } from "react"
import { Link } from "react-router-dom"
import { SearchComponent } from "./SearchComponent"
import { AuthContext } from "../contexts/AuthContext"
import { useAccessToken } from "../hooks/useAccessToken"
import { useApi } from "../hooks/useApi"
import { UserCircleIcon, Bars3Icon } from "@heroicons/react/24/outline"
import { User } from "../interfaces/user"

export const HeaderComponent: FunctionComponent = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const authContext = useContext(AuthContext);
    let user: User = {name: "Profile", slug: ""};

    if (authContext.isConnected) {
        const userId = JSON.stringify({id: useAccessToken()?.aud});
        const userResponse = useApi(`${import.meta.env.VITE_API_URL}/user/id`, 'POST', userId);
        if (userResponse) user = userResponse.data
    }

    return (
        <div id="header" className={`absolute flex items-baseline justify-between md:justify-around top-0 z-10 w-full h-16 p-3 ${showMenu ? 'flex-wrap' : ''}`}>
            <Link to={"/"}>
                <h3 className="text-2xl font-bold text-white">Sauvegarde</h3>
            </Link>
            <button id="button" className="md:hidden font-sans float-right" onClick={() => setShowMenu(!showMenu)}>
                <Bars3Icon className="w-5 h-5" />
            </button>
            <div className={`w-screen md:w-auto md:flex items-center mt-4 md:mt-0 ${showMenu ? 'block' : 'hidden'}`}>
                <SearchComponent />
                {authContext.isConnected ?
                    (<Link to={`/profile/${user.slug}`} id="button" className="w-64 md:w-auto shadow-md mx-auto mt-4 md:mt-0 md:ml-4 flex items-center">
                        <UserCircleIcon className="w-7 h-7" />
                        <span className="w-52 md:max-w-7 ml-1 mr-2 font-sans text-center text-ellipsis overflow-hidden">{user.name}</span>
                    </Link>)
                    :
                    (<Link to={"/login"}>
                        <h4 id="button" className="w-64 md:w-auto mx-auto my-4 md:mx-4 md:my-0 text-center font-sans cursor-pointer">Log in</h4>
                    </Link>)
                }
            </div>
        </div>
    )
}