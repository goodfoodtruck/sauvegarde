import { RequestHandler } from "express"
import { IgdbGameResponse, getIgdbToken } from "../middleware/igdb"
import { Game } from "../models/game"

/*
*   Search game by name, for the client search bar
*   Params:
*       name: string
*   Returns:
*       message: string
*       data[]:
*           name: string
*           first_release_date: number
*/
export const searchGameByName: RequestHandler = async (req, res) => {
    try {
        const igdbToken = await getIgdbToken();
        const request: RequestInit = {
            method: "POST",
            headers: {
                "Client-ID": process.env.IGDB_CLIENT_ID!,
                "Authorization": `Bearer ${igdbToken.accessToken}`,
            },
            body: `fields
                name,
                first_release_date;
                where name ~ *"${req.body.name}"* & rating_count > 0;
                sort rating_count desc;
            `
        };

        fetch("https://api.igdb.com/v4/games", request)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Failed to fetch IGDB");
                } else {
                    return response.json();
                }
            })
            .then((data: IgdbGameResponse[]) => {
                return res.status(200).json({message: "Games fetched successfully", data: data});
            })
            .catch(e => {
                console.error(e);
                return res.status(500).json({message: e.message});
            })
    } catch (e) {
        console.error(e);
    }
}

/*
*   Fetch game by its ID using the IGDB API
*   Params:
*       id: number
*   Returns:
*       message: string
*       data: Game
*/
export const getGameById: RequestHandler = async (req, res) => {
    if (!req.body.id || !Number(req.body.id)) {
        return res.status(400).json({message: "Wrong or no parameter found"});
    }

    try {
        const igdbToken = await getIgdbToken();
        const request: RequestInit = {
            method: "POST",
            headers: {
                "Client-ID": process.env.IGDB_CLIENT_ID!,
                "Authorization": `Bearer ${igdbToken.accessToken}`,
            },
            body: `fields
                name,
                cover.image_id,
                genres.name,
                first_release_date,
                involved_companies.developer,
                involved_companies.company.name,
                summary;
                where id = ${req.body.id};
            `
        };

        fetch("https://api.igdb.com/v4/games", request)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Failed to fetch IGDB");
                } else {
                    return response.json();
                }
            })
            .then((data: IgdbGameResponse[]) => {
                const game = Game.parseIgdbGameResponse(data[0]);
                return res.status(200).json({message: "Game fetched successfully", data: game});
            })
            .catch(e => {
                console.error(e);
                return res.status(500).json({message: e.message});
            })
    } catch (e) {
        console.error(e);
    }
}