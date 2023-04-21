import { FunctionComponent } from "react"
import { useRouteError, isRouteErrorResponse } from "react-router-dom"

export const ErrorPage: FunctionComponent = () => {
    const error = useRouteError();
    console.error(error);
    
    if (isRouteErrorResponse(error)) {
        return (
            <div className="h-screen flex flex-col justify-center">
                <div className="text-center">
                <h1 className="font-bold text-xl">{error.status}</h1>
                    <p>{error.statusText}</p>
                    {error.data.message && (
                        <p>
                            <i>{error.data.message}</i>
                        </p>
                    )}
                </div>
            </div>
        )
    } else {
        return (
            <div className="h-screen flex flex-col justify-center">
                <div className="text-center">
                    <h1 className="font-bold text-xl">Oops !</h1>
                    <p>An error has occured</p>
                </div>
            </div>
        )
    }
}