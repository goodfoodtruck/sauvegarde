import { FunctionComponent } from "react"
import { useApi } from "../hooks/useApi"
import { Review } from "../interfaces/review"
import { User } from "../interfaces/user"

export const ReviewComponent: FunctionComponent<Review> = (props: Review) => {
    const body = JSON.stringify({id: props.userId});
    const response = useApi(`${import.meta.env.VITE_API_URL}/user/id`, 'POST', body);
    const user: User = response?.data;

    return (
        <>
            <p>{user ? user.name : "Not found"}</p>
            <p>{props.description}</p>
        </>
    )
}