import { Router } from "express";
import VisitController from "./controllers/visit.controller";
import VisitService from "./services/visit.service";
import UrlRepository from "../url/repositories/url.repository";
import authMiddleware from "../../middlewares/authMiddleware";

const router = Router();
const urlRepository = new UrlRepository();
const visitService = new VisitService(urlRepository);
const visitController = new VisitController(visitService);

router.get("/:slug/stats", authMiddleware, visitController.getVisitStats);

export default router;