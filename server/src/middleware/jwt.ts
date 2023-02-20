import * as JWT from "jsonwebtoken"
require("dotenv").config();

export const signAccessToken = (userId: number): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: '30s',
            issuer: "sauvegarde",
            audience: userId.toString()
        };
        JWT.sign({}, process.env.ACCESS_TOKEN_SECRET!, options, (err, token) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(token);
            }
        })
    })
}

export const signRefreshToken = (userId: number): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
        const options = {
            expiresIn: '30d',
            issuer: "sauvegarde",
            audience: userId.toString()
        };
        JWT.sign({}, process.env.REFRESH_TOKEN_SECRET!, options, (err, token) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(token);
            }
        })
    })
}

export const verifyAccessToken = (token: string) => {
    const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JWT.JwtPayload;
    const userId = parseFloat(decodedToken.aud as string);
    return userId;
}

export const verifyRefreshToken = (token: string) => {
    const decodedToken = JWT.verify(token, process.env.REFRESH_TOKEN_SECRET!) as JWT.JwtPayload;
    const userId = parseFloat(decodedToken.aud as string);
    return userId;
}