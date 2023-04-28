import { decodeJwt } from "jose"
import { ApiResponse } from "./useApi"

export const useAuthenticated = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        const decodedToken = decodeJwt(accessToken);
        const expirationDate = decodedToken.exp! * 1000;

        if (expirationDate > new Date().getTime()) {
            // Access token found and not expired
            return true
        } else {
            if (localStorage.getItem("refreshToken")) {
                const request: RequestInit = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({refreshToken: localStorage.getItem("refreshToken")})
                };

                try {
                    fetch(`${import.meta.env.VITE_API_URL}/user/refresh`, request)
                        .then((response) => {
                            return response.json()
                        })
                        .then((json: ApiResponse) => {
                            if (json.data.accessToken && json.data.refreshToken) {
                                localStorage.setItem("accessToken", json.data.accessToken);
                                localStorage.setItem("refreshToken", json.data.refreshToken);

                                // Access token was expired and refresh token wasn't, get new ones
                                return true
                            }
                        })
                        .catch((e) => {
                            console.error(e)

                            // An issue appeared during the token refreshing
                            return false
                        })

                    // No local error appeared during the token refreshing
                    return true
                } catch {
                    // A local error appeared during the token refreshing
                    return false
                }
            } else {
                // No refresh token was found in local storage
                return false
            }
        }
    } else {
        // No access token was found in local storage
        return false
    }
}