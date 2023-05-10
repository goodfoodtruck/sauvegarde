import { decodeJwt } from "jose";

export const useAccessToken = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        const decodedToken = decodeJwt(accessToken);
        return decodedToken
    } else {
        return null
    }
}