import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import urlRoutes from "./modules/url/routes";
import errorHandler from "./middlewares/errorHandler";
import rateLimiter from "./middlewares/rateLimiter";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use("/api/url", urlRoutes);
app.use(errorHandler);

export default app;
