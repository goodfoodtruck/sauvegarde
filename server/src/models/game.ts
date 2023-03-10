import { Table, Model, Column, DataType, HasMany } from "sequelize-typescript"
import { Review } from "./review"
import { IgdbGameResponse } from "../middleware/igdb"

@Table({tableName: "games"})
export class Game extends Model {
    @Column({type: DataType.INTEGER, allowNull: false})
    igdb_id!: number;

    @Column({type: DataType.STRING, allowNull: false})
    name!: string;

    @Column({type: DataType.STRING, allowNull: false})
    coverUrl!: string;

    @Column({type: DataType.STRING, allowNull: false})
    genres!: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    first_release_year!: number;

    @Column({type: DataType.STRING, allowNull: false})
    involved_companies!: string;

    @Column({type: DataType.STRING(600), allowNull: false})
    summary!: string;

    @HasMany(() => Review)
    reviews!: Review[];

    static parseIgdbGameResponse(igdbGame: IgdbGameResponse) {
        const igdb_id = igdbGame.id;
        const name = igdbGame.name;
        const coverUrl = `https://images.igdb.com/igdb/image/upload/t_thumb/${igdbGame.cover.image_id}.jpg`;
        const genres = igdbGame.genres.map(genre => genre.name).join(", ");
        const first_release_year = new Date(igdbGame.first_release_date * 1000).getFullYear();
        const summary = igdbGame.summary;
        const involved_companies = igdbGame.involved_companies
            .filter(involved_company => involved_company.developer)
            .map(developer => developer.company.name).join(", ");

        const game = {
            igdb_id: igdb_id,
            name: name,
            coverUrl: coverUrl,
            genres: genres,
            first_release_year: first_release_year,
            involved_companies: involved_companies,
            summary: summary
        };

        return game;
    }
}