import { RequestHandler } from "express"
import { User } from "../models/user"
import { errorHandler } from "../middleware/error"
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../middleware/jwt"
import * as bcrypt from "bcrypt"

/*
*   Create a user and send access/refresh tokens
*   Params:
*       name: string
*       password: string
*   Returns:
*       message: string
*       data: User
*       accessToken: string (JsonWebToken)
*       refreshToken: string (JsonWebToken)
*/
export const createUser: RequestHandler = async (req, res) => {
    if (!req.body.name || !req.body.password) {
        return res.status(400).json({message: "Wrong or no parameter found"})
    }
    User.findOne({where: {name: req.body.name}}).then((user) => {
        if (!user) {
            User.create(req.body).then(async (createdUser) => {
                const accessToken = await signAccessToken(createdUser.id);
                const refreshToken = await signRefreshToken(createdUser.id);
                return res.status(200).json({message: "User created successfully", data: {accessToken: accessToken, refreshToken: refreshToken}})
            }).catch((e) => {
                const error = errorHandler(e);
                return res.status(error.status).json({message: error.message})
            })
        } else {
            return res.status(409).json({message: "User already exists"})
        }
    })
}

/*
*   Fetch user by comparing name in body and name in DB
*   Params:
*       name: string
*   Returns:
*       message: string
*       data: User
*/
export const getUserByName: RequestHandler = async (req, res) => {
    if (!req.body || !req.body.name) {
        return res.status(400).json({message: "Wrong or no parameter found"});
    }

    User.findOne({where: {name: req.body.name}}).then((user) => {
        if (user) {
            return res.status(200).json({message: "User fetched successfully", data: user});
        } else {
            return res.status(400).json({message: "User not found"});
        }
    }).catch((e) => {
        const error = errorHandler(e);
        return res.status(error.status).json({message: error.message});
    });
}

/*
*   Fetch user by its ID
*   Params:
*       id: number
*   Returns:
*       message: string
*       data: 
*           name: string
*/
export const getUserById: RequestHandler = async (req, res) => {
    const { id } = req.body;
    
    if (!id) return res.status(400).json({message: "Wrong or no parameter found"});

    User.findByPk(id).then((user) => {
        if (user) {
            return res.status(200).json({message: "User fetched successfully", data: {name: user.name}})
        } else {
            return res.status(400).json({message: "User not found"});
        }
    }).catch((e) => {
        const error = errorHandler(e);
        return res.status(error.status).json({message: error.message});
    })
}

/*
*   Fetch all users
*   Params: N/A
*   Returns:
*       message: string
*       data: User[]
*/
export const getAllUsers: RequestHandler = async (req, res) => {
    User.findAll().then((allUsers) => {
        return res.status(200).json({message: "Users fetched successfully", data: allUsers});
    }).catch((e) => {
        const error = errorHandler(e);
        return res.status(error.status).json({message: error.message});
    });
}

/*
*   Fetch all of user's reviews
*   Params:
*       id: string | number
*   Returns:
*       message: string
*       data: Review[]
*/
export const getAllUserReviews: RequestHandler = async (req, res) => {
    if (!req.body.id) {
        return res.status(400).json({message: "Wrong or no parameter found"});
    }

    User.findOne({where: req.body}).then((user) => {
        if (user) {
            user.$get('reviews').then((allReviews) => {
                return res.status(200).json({message: "Reviews fetched successfully", data: allReviews});                
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
    });
}

/*
*   Log the user in and send access/refresh tokens
*   Params:
*       name: string
*       password: string
*   Returns:
*       message: string
*       data:
*           accessToken: string (JsonWebToken)
*           refreshToken: string (JsonWebToken)
*/
export const logUser: RequestHandler = async (req, res) => {
    if (!req.body.name || !req.body.password) {
        return res.status(400).json({message: "Wrong or no parameter found"});
    }

    User.findOne({where: {name: req.body.name}}).then(async (user) => {
        if (user) {
            const password_isValid = await bcrypt.compare(req.body.password, user.password);
            if (password_isValid) {
                try {
                    const accessToken = await signAccessToken(user.id);
                    const refreshToken = await signRefreshToken(user.id);
                    return res.status(200).json({message: "User logged successfully", data: {accessToken: accessToken, refreshToken: refreshToken}})
                } catch(e) {
                    const error = errorHandler(e);
                    return res.status(error.status).json({message: error.message});
                }
            } else {
                return res.status(400).json({message: "Incorrect password"});
            }
        } else {
            return res.status(400).json({message: "User not found"});
        }
    }).catch((e) => {
        const error = errorHandler(e);
        return res.status(error.status).json({message: error.message});
    });
}

/*
*   Refresh user access token
*   Params:
*       refreshToken: string (JsonWebToken)
*   Returns:
*       message: string
*       accessToken: string (JsonWebToken)
*       refreshToken: string (JsonWebToken)
*/
export const refreshUserAccess: RequestHandler = async (req, res) => {
    try {
        const userId = verifyRefreshToken(req.body.refreshToken);
        const accessToken = await signAccessToken(userId);
        const refreshToken = await signRefreshToken(userId);
        return res.status(200).json({message: "Access token refreshed successfully", data: {accessToken: accessToken, refreshToken: refreshToken}})
    } catch(e) {
        const error = errorHandler(e);
        return res.status(error.status).json({message: error.message});
    }
}