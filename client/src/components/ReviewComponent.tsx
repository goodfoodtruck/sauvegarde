import { FunctionComponent, useEffect, useState } from "react"
import { Editor, EditorState, convertFromRaw } from "draft-js"
import { useApi } from "../hooks/useApi"
import { Review } from "../interfaces/review"
import { Page } from "./ReviewsComponent"
import { Link, useNavigate } from "react-router-dom"
import { Game } from "../interfaces/game"
import { User } from "../interfaces/user"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useAccessToken } from "../hooks/useAccessToken"

export const ReviewComponent: FunctionComponent<{review: Review, page: Page}> = (props: {review: Review, page: Page}) => {
    const navigate = useNavigate();
    const [fullDescription, setFullDescription] = useState<boolean>();
    const [isTooLong, setIsTooLong] = useState<boolean>();
    let data: Game | User;
    let isUser = false;
    
    if (useAccessToken()?.aud == props.review.userId) isUser = true;

    if (props.page === "game") {
        const payload = JSON.stringify({id: props.review.userId});
        const userResponse = useApi(`${import.meta.env.VITE_API_URL}/user/id`, 'POST', payload);
        data = userResponse?.data;
    } else if (props.page === "profile") {
        const payload = JSON.stringify({igdb_id: props.review.gameId});
        const gameResponse = useApi(`${import.meta.env.VITE_API_URL}/game/id`, 'POST', payload);
        data = gameResponse?.data;
    }

    const contentState = convertFromRaw(JSON.parse(props.review.description));
    const editorState = EditorState.createWithContent(contentState);

    const deleteReview = () => {
        const request: RequestInit = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
            },
            body: JSON.stringify({id: props.review.id})
        }
    
        fetch(`${import.meta.env.VITE_API_URL}/review/delete`, request)
            .then(() => {
                return navigate(0)
            })
            .catch((e) => {
                console.error(e)
            })
    }

    useEffect(() => {
        if (contentState.getPlainText().length > 370 || contentState.getPlainText().split("\n").length > 6) {
            setIsTooLong(true)
        }
    }, [isTooLong]);

    return (
        <div id="review" className={`${props.page === "profile" ? "grid grid-cols-10 md:grid-cols-12 gap-3" : ""} my-3 p-2 md:p-3 min-w-full md:max-w-xl rounded-md ${fullDescription ? 'full' : ''}`}>
            {props.page === "profile" && (
                <div className="col-span-2">
                    <Link to={`/games/${data?.slug}`}>
                        <div className="inline-flex rounded-sm border border-zinc-500 overflow-hidden">
                            <img className="w-full" src={data?.coverUrl} />
                        </div>
                    </Link>
                </div>
            )}
            <div className="col-span-7 md:col-span-9">
                <Link to={props.page === "game" ? `/profile/${data?.slug}` : `/games/${data?.slug}`}>
                    <h4 className="text-sm md:text-lg font-sans font-bold hover:text-white">{data ? data.name : "User unknown"}</h4>
                </Link>
                <div className={`${isTooLong ? fullDescription ? "" : "line-clamp-6" : ""} text-sm md:text-[15px] pt-2 tracking-wide leading-6 whitespace-pre-line`}>
                    <Editor editorState={editorState} readOnly={true} onChange={() => {}} />
                </div>
                {isTooLong && (
                    <span className="cursor-pointer font-special hover:text-white" onClick={() => setFullDescription(!fullDescription)}>
                        {fullDescription ? '(less)' : '(more)'}
                    </span>
                )}
            </div>
            {(props.page === "profile" && isUser) && (
                <div className="col-span-1 flex justify-end">
                    <XMarkIcon
                        className="w-5 h-5 cursor-pointer hover:text-red-500"
                        onClick={() => deleteReview()}    
                    />
                </div>
            )}
        </div>
    )
}