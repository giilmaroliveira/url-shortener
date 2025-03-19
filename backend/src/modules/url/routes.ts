import { Router } from "express";
import UrlController from "./controllers/url.controller";
import { validateUrl } from "./validators/url.validator";
import authMiddleware from "../../middlewares/authMiddleware";

const router = Router();

router.post("/", validateUrl, authMiddleware, UrlController.shortenUrl);
router.get("/", authMiddleware, UrlController.getAll);
router.get("/my-urls", authMiddleware, UrlController.getUserUrls);
router.get("/:slug", authMiddleware, UrlController.redirect);

export default router;