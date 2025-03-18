import { Router } from "express";
import VisitController from "./controllers/visit.controller";

const router = Router();
router.get("/:slug/stats", VisitController.getVisitStats);

export default router;