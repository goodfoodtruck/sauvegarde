import { Sequelize } from "sequelize-typescript"
import { User } from "../models/user"
import { Review } from "../models/review"
import { IgdbToken } from "../models/igdbToken";
require("dotenv").config();

export const sequelize = new Sequelize({
    dialect: "mariadb",
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: false,
    models: [User, Review, IgdbToken]
})