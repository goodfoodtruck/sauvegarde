import { Table, Model, Column, DataType } from "sequelize-typescript"

@Table({tableName: "igdb_token"})
export class IgdbToken extends Model {        
    @Column({type: DataType.STRING, allowNull: false})
    accessToken!: string;

    @Column({type: DataType.DATE, allowNull: false})
    expirationTime!: Date;
}