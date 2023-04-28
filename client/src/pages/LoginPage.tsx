import { FunctionComponent, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { FormComponent } from "../components/FormComponent";

export const LoginPage: FunctionComponent = () => {
    const authContext = useContext(AuthContext);

    if (!authContext.isConnected) {
        return (
            <div id="login" className="flex flex-wrap items-center justify-center mt-52">
                <FormComponent option="login" />
                <FormComponent option="register" />
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