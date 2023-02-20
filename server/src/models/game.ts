export interface IgdbGameResponse {
    cover: { image_id: string}
    first_release_date: number
    genres: Array<{name: string}>
    involved_companies: Array<{company: {name: string}, developer: boolean}>
    name: string
    summary: string
}

export abstract class Game {
    abstract name: string
    abstract coverUrl: string
    abstract genres: string[]
    abstract first_release_year: number
    abstract involved_companies: string[]
    abstract summary: string

    static createFromIgdbGameResponse(igdbGame: IgdbGameResponse): Game {
        const name = igdbGame.name;
        const coverUrl = `https://images.igdb.com/igdb/image/upload/t_thumb/${igdbGame.cover.image_id}.jpg`;
        const genres = igdbGame.genres.map(genre => genre.name);
        const first_release_year = new Date(igdbGame.first_release_date * 1000).getFullYear();
        const summary = igdbGame.summary;
        const involved_companies = igdbGame.involved_companies
            .filter(involved_company => involved_company.developer)
            .map(developer => developer.company.name);

        const game: Game = {
            name: name,
            coverUrl: coverUrl,
            genres: genres,
            first_release_year: first_release_year,
            involved_companies: involved_companies,
            summary: summary
        };

        return game
    }
}