import { RequestHandler } from "express"
import { Review } from "../models/review"
import { errorHandler } from "../middleware/error"
import { verifyAccessToken } from "../middleware/jwt"
import { User } from "../models/user"
import { Game } from "../models/game"

/*
*   Create user review with user's access token
*   Header:
*       Authorization: string ("Bearer " + JsonWebToken)
*   Params:
*       game: Game
*       description: string
*   Returns:
*       message: string
*       data: Review
*/
export const createReview: RequestHandler = async (req, res) => {
    try {
        const userId = verifyAccessToken(req.headers.authorization?.split(" ")[1] as string);
        const [game, created] = await Game.findOrCreate({
            where: { igdb_id: req.body.game.igdb_id },
            defaults: req.body.game
        });
        const user = await User.findOne({where: {id: userId}});
        const createdReview = await Review.create({gameId: game.igdb_id, userId: user?.id, description: req.body.description});
        return res.status(200).json({message: "Review created successfully", data: createdReview});
    } catch(e) {
        const error = errorHandler(e);
        return res.status(error.status).json({message: error.message});
    }
}

/*
*   Fetch all review
*   Params: N/A
*   Returns:
*       message: string
*       data: Review[]
*/
export const getAllReviews: RequestHandler = async (req, res) => {
    Review.findAll().then((allReviews) => {
        return res.status(200).json({message: "Reviews fetched successfully", data: allReviews});
    }).catch((e) => {
        const error = errorHandler(e);
        return res.status(error.status).json({message: error.message});
    })
}