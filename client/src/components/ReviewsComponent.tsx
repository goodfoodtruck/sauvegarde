import { FunctionComponent } from "react"
import { useApi } from "../hooks/useApi"
import { Review } from "../interfaces/review"
import { ReviewComponent } from "./ReviewComponent";

export const ReviewsComponent: FunctionComponent = () => {
    const response = useApi(`${import.meta.env.VITE_API_URL}/review/all`, 'GET');
    const reviews: Review[] = response?.data;
    
    if (reviews) {
        return (
            <>
                {reviews.map((review) => (
                    <div key={review.id}>
                        <ReviewComponent
                            id={review.id}
                            userId={review.userId}
                            igdb_id={review.userId}
                            description={review.description}
                        />
                    </div>
                ))}
            </>
        )
    } else {
        return (
            <p className="font-bold">Couldn't fetch the reviews</p>
        )
    }
}