import { Router } from "express";
import VisitController from "./controllers/visit.controller";
import VisitService from "./services/visit.service";
import UrlRepository from "../url/repositories/url.repository";

const router = Router();
const urlRepository = new UrlRepository();
const visitService = new VisitService(urlRepository);
const visitController = new VisitController(visitService);

router.get("/:slug/stats", visitController.getVisitStats);

export default router;