import { FunctionComponent, useContext, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { Game } from "../interfaces/game"
import { ReviewsComponent } from "../components/ReviewsComponent"
import { AuthContext } from "../contexts/AuthContext"
import { EditorComponent } from "../components/EditorComponent"
import { PencilIcon } from "@heroicons/react/24/outline"

export const GamePage: FunctionComponent = () => {
    const [isReviewing, setIsReviewing] = useState<boolean>();
    const game = useLoaderData() as Game;
    const authContext = useContext(AuthContext);

    return (
        <div className="Game">
            {authContext.isConnected && isReviewing && (
                <EditorComponent
                    setIsReviewing={setIsReviewing}
                    game={game}
                />
            )}
            <div className="absolute w-full h-96 -z-10 top-0 left-0 md:bg-100 bg-center" style={{backgroundImage: `url('${game.screenshotUrl}')`}}>
                <div className="gradient h-full" style={{background: "linear-gradient(0deg, rgba(37,36,57,1) 0%, rgba(253,187,45,0) 100%)"}}></div>
            </div>
            <div className="md:grid md:grid-cols-3 gap-5 md:gap-10 pt-44 md:pt-96">
                <div className="md:col-span-1 md:-translate-y-32 text-center md:text-end">
                    <div className="inline-flex rounded-sm border border-zinc-500 overflow-hidden">
                        <img className="w-44" src={game.coverUrl} />
                    </div>
                    <div className="hidden md:block">
                        <div className="mb-4 font-sans">
                            <span>developed by</span>
                            {game.involved_companies.split(", ").map(company => (
                                <h4 key={company} className="font-special text-lg">{company}</h4>
                            ))}
                        </div>
                        <div className="mb-4 font-sans">
                            <span>genres</span>
                            {game.genres.split(", ").map(genre => (
                                <h4 key={genre} className="font-special text-lg">{genre}</h4>
                            ))}
                        </div>
                        <div className="mb-4 font-sans">
                            <span>platforms</span>
                            {game.platforms.split(", ").map(platform => (
                                <h4 key={platform} className="font-special text-lg">{platform}</h4>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="md:col-span-2 mx-4 md:mx-0">
                    <div className="md:flex md:items-end py-4 md:my-0">
                        <h1 className="text-3xl md:text-4xl font-bold text-white text-center md:text-left">
                            {game.name}
                            <span className="font-special font-sans text-lg md:text-xl ml-2">{game.first_release_year}</span>
                        </h1>
                    </div>
                    <div className="md:hidden my-3">
                        <div className="max-w-xl mt-2 font-sans">
                            <h4 className="text-sm md:text-base">developed by</h4>
                            <span className="font-special font-bold">{game.involved_companies}</span>
                        </div>
                        <div className="max-w-xl mt-2 font-sans">
                            <h4 className="text-sm md:text-base">genres</h4>
                            <span className="font-special font-bold">{game.genres}</span>
                        </div>
                        <div className="max-w-xl mt-2 font-sans">
                            <h4 className="text-sm md:text-base">platforms</h4>
                            <span className="font-special font-bold">{game.platforms}</span>
                        </div>
                    </div>
                    <div className="max-w-full text-sm md:text-base md:max-w-xl">
                        <p className="my-3 line-clamp-6">
                            {game.summary}
                        </p>
                        {authContext.isConnected && (
                            <button id="button" onClick={() => setIsReviewing(true)} className="w-full md:max-w-full flex items-center justify-center py-1 font-sans font-bold">
                                <PencilIcon className="w-5 h-5 mr-1" />
                                Review this game
                            </button>
                        )}
                    </div>
                    <span className="max-w-full md:max-w-xl md:mr-4 my-3" id="separator" />
                    <div id="reviews" className="md:max-w-xl md:mr-4">
                        <h3 className="font-sans md:text-xl">Reviews</h3>
                        <ReviewsComponent
                            page="game"
                            data={game}
                        />
                    </div>
                </div>
            </div>
            
        </div>
    )
}