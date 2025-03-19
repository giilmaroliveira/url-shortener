import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import urlRoutes from "./modules/url/routes";
import visitRoutes from "./modules/visit/routes";
import authRoutes from "./modules/auth/routes";
import errorHandler from "./middlewares/errorHandler";
import rateLimiter from "./middlewares/rateLimiter";
import loggerMiddleware from "./middlewares/loggerMiddleware";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use(rateLimiter);
app.use("/api/url", urlRoutes);
app.use("/api/visit", visitRoutes);
app.use("/api/auth", authRoutes);
app.use(errorHandler);

export default app;
