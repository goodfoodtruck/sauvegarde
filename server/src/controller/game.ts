import { RequestHandler } from "express"
import { IgdbGameResponse, IgdbSearchGameResponse, getIgdbToken } from "../middleware/igdb"
import { Game } from "../models/game"
import { errorHandler } from "../middleware/error";

/*
*   Search game by name, for the client search bar
*   Params:
*       name: string
*   Returns:
*       message: string
*       data[]:
*           name: string
*           first_release_date: number
*           slug: string
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
                first_release_date,
                slug;
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
            .then((data: IgdbSearchGameResponse[]) => {
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
*   Fetch game by its slug using the IGDB API
*   Params:
*       slug: string
*   Returns:
*       message: string
*       data: Game
*/
export const getGameBySlug: RequestHandler = async (req, res) => {
    if (!req.body.slug || !String(req.body.slug)) {
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
                slug,
                cover.image_id,
                screenshots.image_id,
                genres.name,
                platforms.name,
                first_release_date,
                involved_companies.developer,
                involved_companies.company.name,
                summary;
                where slug = "${req.body.slug}";
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

/*
*   Fetch game by its id
*   Params:
*       id: number
*   Returns:
*       message: string
*       data: Game
*/
export const getGameById: RequestHandler = async (req, res) => {
    const { igdb_id } = req.body;
    
    if (!igdb_id) return res.status(400).json({message: "Wrong or no parameter found"});

    Game.findByPk(igdb_id).then((game) => {
        if (game) {
            return res.status(200).json({message: "Game fetched successfully", data: game})
        } else {
            return res.status(400).json({message: "Game not found"});
        }
    }).catch((e) => {
        const error = errorHandler(e);
        return res.status(error.status).json({message: error.message});
    })
}