import { Table, Model, Column, DataType, HasMany, BeforeCreate } from "sequelize-typescript"
import { Review } from "./review"
import * as bcrypt from "bcrypt"

@Table({tableName: "users"})
export class User extends Model {
    @Column({type: DataType.STRING, allowNull: false})
    name!: string;

    @Column({type: DataType.STRING, allowNull: false})
    password!: string;

    @Column({type: DataType.STRING})
    slug!: string;

    @HasMany(() => Review)
    reviews!: Review[];

    @BeforeCreate
    static async hashPassword(instance: User) {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(instance.password, salt);
            instance.password = hashedPassword;
        } catch(e) {
            console.error("Error hashing password before creation", e);
        }
    }

    @BeforeCreate
    static async slugifyName(instance: User) {
        try {
            const slug = instance.name.replace(/\W+/g, '-').toLowerCase();
            instance.slug = slug
        } catch(e) {
            console.error("Error when creating slug for user", e)
        }
    }
}