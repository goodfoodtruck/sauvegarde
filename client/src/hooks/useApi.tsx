import { useEffect, useState } from "react"

export type HTTPMethod = 'GET' | 'POST'

export interface ApiResponse {
    message: string
    data?: any | any[]
}

export const useApi = (url: string, method: HTTPMethod, body?: string): ApiResponse | undefined => {
    const [data, setData] = useState<ApiResponse>();

    useEffect(() => {
        const request: RequestInit = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? body : null
        }

        fetch(url, request)
            .then((response) => {
                return response.json()
            })
            .then((json: ApiResponse) => {
                if (!json.data) console.error(json.message)
                setData(json);
            })
            .catch((e) => {
                console.error(e);
            })

    }, []);

    return data
}