import { Table, Model, BelongsTo, ForeignKey, Column, DataType } from "sequelize-typescript"
import { User } from "./user"

@Table({tableName: "reviews"})
export class Review extends Model {
    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId!: number;

    @BelongsTo(() => User)
    user!: User;
    
    @Column({type: DataType.INTEGER, allowNull: false})
    igdb_id!: number;

    @Column({type: DataType.STRING(500), allowNull: false})
    description!: string;
}