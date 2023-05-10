import { LoaderFunction } from "react-router-dom"

export const useProfileLoader: LoaderFunction = async ({params}) => {
    const userSlug = JSON.stringify({slug: params.slug});
    const url = `${import.meta.env.VITE_API_URL}/user/slug`;
    const request: RequestInit = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: userSlug
    };

    try {
        const response = await fetch(url, request);
        const json = await response.json();
        if (json.data) {
            return json.data;
        } else {
            throw new Error("Couldn't fetch game");
        }
    } catch (e) {
        console.error(e);
    }
}