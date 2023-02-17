import { RequestHandler } from "express"
import { Review } from "../models/review"
import { errorHandler } from "../middleware/error"
import { verifyAccessToken } from "../middleware/jwt"
import { User } from "../models/user"

/*
*   Create user review with user's access token
*   Header:
*       Authorization: string ("Bearer " + JsonWebToken)
*   Params:
*       igb_id: number
*       description: string
*   Returns:
*       message: string
*       data: Review
*/
export const createReview: RequestHandler = async (req, res) => {
    try {
        req.body.userId = verifyAccessToken(req.headers.authorization?.split(" ")[1] as string);
    } catch(e) {
        const error = errorHandler(e);
        return res.status(error.status).json({message: error.message});
    }

    User.findOne({where: {id: req.body.userId}}).then((user) => {
        if (user) {
            Review.create(req.body).then((createdReview) => {
                return res.status(200).json({message: "Review created successfully", data: createdReview});
            }).catch((e) => {
                const error = errorHandler(e);
                return res.status(error.status).json({message: error.message});
            });
        } else {
            return res.status(400).json({message: "User not found"});
        }
    }).catch((e) => {
        const error = errorHandler(e);
        return res.status(error.status).json({message: error.message});
    })
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