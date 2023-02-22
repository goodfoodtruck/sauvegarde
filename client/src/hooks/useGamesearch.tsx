import { useEffect, useState } from "react";
import { ApiResponse, useApi } from "./useApi";

export interface SearchGame {
    name: string
    first_release_date: number
}

export const useGameSearch = (search: string) => {
    const [games, setGames] = useState<SearchGame[]>();

    useEffect(() => {
        if (search.length > 2) {
            const nameSearch = JSON.stringify({name: search});
            const request: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: nameSearch
            };
    
            fetch(`${import.meta.env.VITE_API_URL}/game/search`, request)
                .then((response) => {
                    return response.json()
                })
                .then((json: ApiResponse) => {
                    if (!json.data) console.error(json.message)
                    setGames(json?.data);
                })
                .catch((e) => {
                    console.error(e);
                })
        }
    }, [search]);

    return games;
}                                                                                        