import { FunctionComponent, useState } from "react"
import { useApi } from "../hooks/useApi"
import { Review } from "../interfaces/review"

export const ReviewComponent: FunctionComponent<{review: Review}> = (props: {review: Review}) => {
    const userId = JSON.stringify({id: props.review.userId});
    const userResponse = useApi(`${import.meta.env.VITE_API_URL}/user/name`, 'POST', userId);
    const userName: string = userResponse?.data;

    const [fullDescription, setFullDescription] = useState<boolean>(false);
    const description = fullDescription ? props.review.description : props.review.description.slice(0, 500);

    return (
        <div id="review" className={`my-3 p-2 md:p-3 max-w-full md:max-w-xl rounded-md ${fullDescription ? 'full' : ''}`}>
            <h4 className="text-sm md:text-base font-sans font-bold">{userName ? userName : "User unknown"}</h4>
            <p className="text-sm md:text-[15px] pt-2 tracking-wide leading-6">
                {fullDescription ? description : description + "..."}
                <span className="cursor-pointer font-special font-bold hover:text-white" onClick={() => setFullDescription(!fullDescription)}>
                    {fullDescription ? ' less' : ' more'}
                </span>
            </p>
        </div>
    )
}