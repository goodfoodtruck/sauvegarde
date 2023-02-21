import { FunctionComponent } from "react"
import { useApi } from "../hooks/useApi"
import { Review } from "../interfaces/review"

export const ReviewComponent: FunctionComponent<Review> = (props: Review) => {
    const userId = JSON.stringify({id: props.userId});
    const userResponse = useApi(`${import.meta.env.VITE_API_URL}/user/name`, 'POST', userId);
    const userName: string = userResponse?.data;

    return (
        <>
            <p>{userName ? userName : "Not found"}</p>
            <p>{props.description}</p>
        </>
    )
}