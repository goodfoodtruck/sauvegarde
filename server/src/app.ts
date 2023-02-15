import express = require("express")
import { urlencoded } from "body-parser"
import { sequelize } from "./db/config"
import userRoutes from "./routes/user"
import reviewRoutes from "./routes/review"
require("dotenv").config();

const app = express();

app.use(urlencoded({extended: true}));

app.use("/user", userRoutes);
app.use("/review", reviewRoutes);

sequelize.sync().then(() => {
    console.log("Synchronized with database successfully");
}).catch(() => {
    console.log("Error connecting to database");
})

app.listen(process.env.PORT, () => {
    console.log("Server is running");
});