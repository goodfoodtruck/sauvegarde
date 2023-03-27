import { IgdbToken } from "../models/igdbToken"

export interface IgdbGameResponse {
    id: number
    cover: {image_id: string}
    screenshots: Array<{image_id: string}>
    first_release_date: number
    genres: Array<{name: string}>
    platforms: Array<{name: string}>
    involved_companies: Array<{company: {name: string}, developer: boolean}>
    name: string
    summary: string
}

export interface IgdbSearchGameResponse {
    name: string
    first_release_date: number
    slug: string
}

interface ExternalIgdbToken {
    access_token: string
    expires_in: number
}

/* 
*   Fetch the access token in DB
*   Check if it exists, if not, create it
*   Also check for its expiration date, if expired, update it
*/
export const getIgdbToken = async (): Promise<IgdbToken> => {
    try {
        const igdbToken = await IgdbToken.findOne();

        if (igdbToken && igdbToken.expirationTime > new Date()) {
            return igdbToken; 
        } else if (igdbToken && igdbToken.expirationTime < new Date()) {
            const updatedToken = await updateIgdbToken(igdbToken.id);
            return updatedToken;
        } else {
            const createdToken = await createIgdbToken();
            return createdToken;
        }
    } catch (e) {
        console.error(e);
        throw new Error("Failed to fetch IGDB token");
    }
}

/*
*   Use the generated token by twitch.tv
*   and store it in the local database
*/
const createIgdbToken = async (): Promise<IgdbToken> => {
    try {
        const generatedToken = await generateIgdbToken();
        const createdToken = await IgdbToken.create({
            accessToken: generatedToken.access_token,
            expirationTime: new Date(new Date().getTime() + generatedToken.expires_in * 1000)
        });
        return createdToken;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to create IGDB token");
    }
}

/*
*   Update token by generating a new one from twitch.tv
*/
const updateIgdbToken = async (id: number): Promise<IgdbToken> => {
    try {
        const generatedToken = await generateIgdbToken();
    
        IgdbToken.update({
            accessToken: generatedToken.access_token,
            expirationTime: new Date(new Date().getTime() + generatedToken.expires_in * 1000)
        }, {
            where: {id}
        });

        const updatedToken = await IgdbToken.findByPk(id);
        
        if (updatedToken) {
            return updatedToken;
        } else {
            throw new Error("Failed to find updated IGDB token");
        }
    } catch (e) {
        console.error(e);
        throw new Error("Failed to update IGDB token");
    }
}

/*
*   Generate an access token from twitch.tv
*   Thus we can make calls to the igdb.com API
*/
const generateIgdbToken = async (): Promise<ExternalIgdbToken> => {
    const params = new URLSearchParams({
        client_id: process.env.IGDB_CLIENT_ID!,
        client_secret: process.env.IGDB_CLIENT_SECRET!,
        grant_type: "client_credentials"
    }).toString();
    const request: RequestInit = {
        method: 'POST',
    };

    try {
        const response = await fetch(`https://id.twitch.tv/oauth2/token?${params}`, request);
        const data = response.json();
        return data;
    } catch (e) {
        console.error(e);
        throw new Error("Failed to generate IGDB token");
    }
}