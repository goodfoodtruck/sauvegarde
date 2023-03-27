import { FunctionComponent } from "react"
import { useLoaderData } from "react-router-dom"
import { Game } from "../interfaces/game"

export const GamePage: FunctionComponent = () => {
    const game = useLoaderData() as Game;

    return (
        <div className="Game">
            <div className="absolute w-full h-96 -z-10 top-0 left-0 md:bg-100 bg-center" style={{backgroundImage: `url('${game.screenshotUrl}')`}}>
                <div className="gradient h-full" style={{background: "linear-gradient(0deg, rgba(37,36,57,1) 0%, rgba(253,187,45,0) 100%)"}}></div>
            </div>
            <div className="grid grid-cols-3 ml-5 gap-5 md:gap-10 pt-44 md:pt-96">
                <div className="col-span-1 md:-translate-y-32 md:text-end">
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
                <div className="col-span-2">
                    <div className="flex items-end">
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            {game.name}
                            <span className="font-special font-sans text-lg md:text-xl ml-2">{game.first_release_year}</span>
                        </h1>
                    </div>
                    <div className="md:hidden">
                        <div className="max-w-xl mt-2 font-sans ">
                            <h4>developed by <span className="font-special font-bold">{game.involved_companies}</span></h4>
                        </div>
                        <div className="max-w-xl mt-2 font-sans ">
                            <h4>genre of <span className="font-special font-bold">{game.genres}</span></h4>
                        </div>
                        <div className="max-w-xl mt-2 font-sans ">
                            <h4>play on <span className="font-special font-bold">{game.platforms}</span></h4>
                        </div>
                    </div>
                    <div className="hidden md:block max-w-xl mt-4">
                        <p className="line-clamp-6">
                            {game.summary}
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-xl m-4 md:hidden">
                <p className="line-clamp-6">
                    {game.summary}
                </p>
            </div>
        </div>
    )
}