import express = require("express")
import cors = require("cors")
import { json } from "body-parser"
import { sequelize } from "./db/config"
import userRoutes from "./routes/user"
import reviewRoutes from "./routes/review"
import gameRoutes from "./routes/game"
require("dotenv").config();

const app = express();

app.use(cors());
app.use(json());

app.use("/user", userRoutes);
app.use("/review", reviewRoutes);
app.use("/game", gameRoutes);

sequelize.sync().then(() => {
    console.log("Synchronized with database successfully");
}).catch((e) => {
    console.error("Error connecting to database", e);
})

app.listen(process.env.PORT, () => {
    console.log("Server is running");
});