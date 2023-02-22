import { Table, Model, BelongsTo, ForeignKey, Column, DataType } from "sequelize-typescript"
import { User } from "./user"
import { Game } from "./game"

@Table({tableName: "reviews"})
export class Review extends Model {
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @Column({type: DataType.STRING(500), allowNull: false})
    description!: string;

    @ForeignKey(() => Game)
    @Column({type: DataType.INTEGER, allowNull: false})
    gameId!: number;

    @BelongsTo(() => Game)
    game!: Game;
}