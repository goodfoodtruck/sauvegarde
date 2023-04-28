import { FormEvent, FunctionComponent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ApiResponse } from "../hooks/useApi"

interface FormOption {
    option: "login" | "register"
}

export const FormComponent: FunctionComponent<FormOption> = (props: FormOption) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>();
    const navigate = useNavigate();
    const userBody = JSON.stringify({name: username, password: password});

    const fetchUserAccess = () => {
        const request: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: userBody
        }
    
        fetch(`${import.meta.env.VITE_API_URL}/user/${props.option}`, request)
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

    return (
        <div className="m-4">
            <h2 className="mb-8 text-3xl text-center font-sans font-bold">{props.option === "login" ? "Log in" : "Register"}</h2>
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
                    value={props.option.charAt(0).toUpperCase() + props.option.slice(1)}
                />
            </form>
        </div>
    )
}