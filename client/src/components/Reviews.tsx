import { FunctionComponent } from "react"
import { useApi } from "../hooks/useApi"
import { Review } from "../interfaces/review"

export const Reviews: FunctionComponent = () => {
    const response = useApi(`${import.meta.env.VITE_API_URL}/review/all`);
    const reviews: Review[] = response?.data;
    
    if (reviews) {
        return (
            <>
                {reviews.map((review) => (
                    <div className="Review" key={review.id}>
                        <h2>{review.id}</h2>
                        <h3>{review.userId}</h3>
                        <h3>{review.igdb_id}</h3>
                        <p>{review.description}</p>
                    </div>
                ))}
            </>
        )
    } else {
        return (
            <p>Couldn't fetch the reviews</p>
        )
    }
}