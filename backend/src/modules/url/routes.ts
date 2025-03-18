import { Router } from "express";
import UrlController from "./controllers/url.controller";

const router = Router();

router.post("/", UrlController.shortenUrl);
router.get("/:slug", UrlController.redirect);

export default router;