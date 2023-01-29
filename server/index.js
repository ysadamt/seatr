import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";

import postRoutes from "./routes/posts.js";

const app = express();

app.use("/posts", postRoutes);

config();
process.env.MONGO_PW;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = `mongodb+srv://th23:${process.env.MONGO_PW}@cluster0.i8x4t8m.mongodb.net/?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message));

mongoose.set("strictQuery", false);