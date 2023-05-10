import { FunctionComponent, useState } from "react"
import { useLoaderData, useNavigate } from "react-router-dom"
import { ReviewsComponent } from "../components/ReviewsComponent"
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline"
import { User } from "../interfaces/user"
import { useAccessToken } from "../hooks/useAccessToken"

export const ProfilePage: FunctionComponent = () => {
    const navigate = useNavigate();
    const user = useLoaderData() as User;
    let isUser = false;
    
    if (useAccessToken()?.aud == user.id) isUser = true;

    const disconnect = () => {
        localStorage.clear();
        return navigate("/")
    }

    return (
        <div className="Profile">
            <div id="summary" className="max-w-screen mt-24 mb-12 flex flex-col items-center">
                <h2 className="max-w-full px-4 text-4xl text-center break-words text-white font-sans font-bold">{user.name}</h2>
                <div className="flex my-5">
                    {isUser && (
                        <button id="button" onClick={() => disconnect()} className="flex items-center mx-2 font-sans">
                            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-1" />
                            Log out
                        </button>
                    )}
                </div>
            </div>
            <span className="max-w-full md:w-[630px] mx-4 md:mx-auto my-3" id="separator" />
            <div id="reviews" className="md:w-[632px] mx-4 md:mx-auto">
                <h3 className="font-sans md:text-xl">{user.name}'s reviews</h3>
                <ReviewsComponent
                    page="profile"
                    data={user.id}
                />
            </div>
        </div>
    )
}