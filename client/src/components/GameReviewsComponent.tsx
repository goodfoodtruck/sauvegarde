import { FunctionComponent } from "react"
import { useApi } from "../hooks/useApi"
import { Review } from "../interfaces/review"
import { ReviewComponent } from "./ReviewComponent"
import { Game } from "../interfaces/game"

export const GameReviewsComponent: FunctionComponent<{game: Game}> = (props: {game: Game}) => {
    const gamePayload = JSON.stringify(props);
    const response = useApi(`${import.meta.env.VITE_API_URL}/review/game`, 'POST', gamePayload);
    const reviews: Review[] = response?.data;
    
    if (reviews && reviews.length > 0) {
        return (
            <>
                {reviews.map((review) => (
                    <div key={review.id}>
                        <ReviewComponent review={review} />
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