import { FunctionComponent, useEffect, useState } from "react"
import { Editor, EditorState, convertFromRaw } from "draft-js"
import { useApi } from "../hooks/useApi"
import { Review } from "../interfaces/review"

export const ReviewComponent: FunctionComponent<{review: Review}> = (props: {review: Review}) => {
    const [fullDescription, setFullDescription] = useState<boolean>();
    const [isTooLong, setIsTooLong] = useState<boolean>();
    const userId = JSON.stringify({id: props.review.userId});
    const userResponse = useApi(`${import.meta.env.VITE_API_URL}/user/name`, 'POST', userId);
    const userName: string = userResponse?.data.name;

    const contentState = convertFromRaw(JSON.parse(props.review.description));
    const editorState = EditorState.createWithContent(contentState);

    useEffect(() => {
        if (contentState.getPlainText().length > 370 || contentState.getPlainText().split("\n").length > 6) {
            setIsTooLong(true)
        }
    }, [isTooLong]);

    return (
        <div id="review" className={`my-3 p-2 md:p-3 max-w-full md:max-w-xl rounded-md ${fullDescription ? 'full' : ''}`}>
            <h4 className="text-sm md:text-base font-sans font-bold">{userName ? userName : "User unknown"}</h4>
            <div className={`${isTooLong ? fullDescription ? "" : "line-clamp-6" : ""} text-sm md:text-[15px] pt-2 tracking-wide leading-6 whitespace-pre-line`}>
                <Editor editorState={editorState} readOnly={true} onChange={() => {}} />
            </div>
            {isTooLong && (
                <span className="cursor-pointer font-special hover:text-white" onClick={() => setFullDescription(!fullDescription)}>
                    {fullDescription ? '(less)' : '(more)'}
                </span>
            )}
        </div>
    )
}