import { FunctionComponent, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useDebounce } from "../hooks/useDebounce"
import { useGameSearch } from "../hooks/useGamesearch"

export const SearchComponent: FunctionComponent = () => {
    const [search, setSearch] = useState<string>("");
    const [focus, setFocus] = useState<boolean>(false);
    const debouncedSearch = useDebounce(search, 400);
    const games = useGameSearch(debouncedSearch);
    const searchRef = useRef<HTMLDivElement>(null);

    if (!search && games) games.length = 0;

    useEffect(() => {
        searchRef.current?.addEventListener("click", (e) => {
            e.stopPropagation();
            setFocus(true);
        });
        document.addEventListener("click", () => setFocus(false))
    }, []);

    return (
        <div ref={searchRef} className="search w-fit mx-auto flex items-center mt-20 flex-col">
            <input
                type="text"
                className="w-64 p-2 m-auto rounded-md shadow-lg outline-none"
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul className="divide-y divide-zinc-700">
                {focus && games?.map(game => (
                    <li className="w-64 bg-black bg-opacity-20 text-sm hover:bg-zinc-700 hover:text-zinc-200">
                        <Link to={`games`} className="contents">
                            <h3 className="truncate p-2">
                                {game.name} ({new Date(new Date(game.first_release_date * 1000)).getFullYear()})
                            </h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}