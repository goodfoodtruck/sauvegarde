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
        <div ref={searchRef} id="search" className="relative flex items-center flex-col font-sans">
            <input
                type="text"
                className="w-64 p-2 m-auto rounded-md shadow-lg outline-none"
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul className="absolute top-10 divide-y divide-zinc-700">
                {focus && games?.map(game => (
                    <li key={game.slug} className="w-64 bg-black bg-opacity-50 backdrop-blur-sm text-sm hover:bg-black hover:bg-opacity-70 hover:text-zinc-200">
                        <Link to={`games/${game.slug}`} className="contents">
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