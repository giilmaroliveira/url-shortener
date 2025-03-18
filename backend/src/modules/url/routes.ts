import { Router } from "express";
import UrlController from "./controllers/url.controller";
import { validateUrl } from "./validators/url.validator";

const router = Router();

router.post("/", validateUrl, UrlController.shortenUrl);
router.get("/:slug", UrlController.redirect);

export default router;