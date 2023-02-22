import { FunctionComponent, useState } from "react"
import { useDebounce } from "../hooks/useDebounce"
import { useGameSearch } from "../hooks/useGamesearch"

export const SearchComponent: FunctionComponent = () => {
    const [search, setSearch] = useState<string>("");
    const [focus, setFocus] = useState<boolean>(false);
    const debouncedSearch = useDebounce(search, 400);
    const games = useGameSearch(debouncedSearch);

    if (!search && games) games.length = 0

    return (
        <div className="search">
            <div className="flex justify-center items-center mt-20 flex-col">
                <input
                    type="text"
                    className="w-64 p-2 m-auto rounded-md shadow-lg outline-none"
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />
                <div className="divide-y divide-zinc-700">
                    {focus && games?.map(game => (
                        <div className="w-64 p-2 bg-black bg-opacity-20 text-sm cursor-pointer hover:bg-zinc-700 hover:text-zinc-200"
                            key={game.name}
                        >
                            <h3 className="truncate">
                                {game.name} ({new Date(new Date(game.first_release_date * 1000)).getFullYear()})
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}