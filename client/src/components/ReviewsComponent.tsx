import { FunctionComponent } from "react"
import { useApi } from "../hooks/useApi"
import { Review } from "../interfaces/review"
import { ReviewComponent } from "./ReviewComponent"
import { Game } from "../interfaces/game"

export type Page = "game" | "profile"

export const ReviewsComponent: FunctionComponent<{page: Page, data: Game | number}> = (props: {page: Page, data: Game | number}) => {
    const payload = props.page === "game" ? JSON.stringify(props.data) : JSON.stringify({id: props.data});
    const response = useApi(`${import.meta.env.VITE_API_URL}/${props.page === "game" ? "review/game" : "user/reviews"}`, 'POST', payload);
    const reviews: Review[] = response?.data;

    if (reviews && reviews.length > 0) {
        return (
            <>
                {reviews.slice().reverse().map((review) => (
                    <div key={review.id}>
                        <ReviewComponent
                            review={review}
                            page={props.page}
                        />
                    </div>
                ))}
            </>
        )
    } else {
        return (
            <p className="font-bold py-3">No review was found</p>
        )
    }
}