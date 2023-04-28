import { FormEvent, FunctionComponent, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ApiResponse } from "../hooks/useApi"
import { AuthContext } from "../contexts/AuthContext"

export const LoginPage: FunctionComponent = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>();
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const loginBody = JSON.stringify({name: username, password: password});
    
    const fetchUserAccess = () => {
        const request: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: loginBody
        }
    
        fetch(`${import.meta.env.VITE_API_URL}/user/login`, request)
            .then((response) => {
                return response.json()
            })
            .then((json: ApiResponse) => {
                if (!json.data) {
                    setErrorMessage(json.message)
                } else if (json.data.accessToken && json.data.refreshToken) {
                    localStorage.setItem("accessToken", json.data.accessToken);
                    localStorage.setItem("refreshToken", json.data.refreshToken);
                    return navigate(0)
                }
            })
            .catch((e) => {
                console.error(e)
            })
    }
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchUserAccess()
    }

    if (!authContext.isConnected) {
        return (
            <div id="login" className="h-screen flex flex-col items-center justify-center">
                <h2 className="mb-8 text-3xl font-sans font-bold">Log in</h2>
                <form onSubmit={handleSubmit} className="flex flex-col p-8 rounded-lg">
                    <input
                        type="text"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                        className="w-64 md:w-80 m-2 p-2 md:p-1 rounded-md font-sans"
                        name="name"
                        placeholder="Username"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-64 md:w-80 m-2 p-2 md:p-1 rounded-md font-sans"
                        name="password"
                        placeholder="Password"
                    />
                    {errorMessage && (
                        <span id="error" className="m-auto py-1 px-2 rounded-md font-sans text-sm">
                            {errorMessage}
                        </span>
                    )}
                    <input
                        type="submit"
                        id="button"
                        className="mt-4 mx-auto md:p-2 font-sans cursor-pointer"
                        value="Login"
                    />
                </form>
            </div>
        )
    } else {
        return (
            <div id="login" className="h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl font-sans font-bold">
                    You're already logged in
                </h2>
            </div>
        )
    }
}