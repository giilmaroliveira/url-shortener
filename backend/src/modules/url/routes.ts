import { Router } from "express";
import UrlController from "./controllers/url.controller";
import { validateUrl } from "./validators/url.validator";
import authMiddleware from "../../middlewares/authMiddleware";
import UrlRepository from "./repositories/url.repository";
import UrlService from "./services/url.service";

const router = Router();
const urlRepository = new UrlRepository();
const urlService = new UrlService(urlRepository);
const urlController = new UrlController(urlService);

router.post("/", validateUrl, authMiddleware, urlController.shortenUrl);
router.get("/", authMiddleware, urlController.getAll);
router.get("/my-urls", authMiddleware, urlController.getUserUrls);
router.get("/:slug", urlController.redirect);
router.patch("/:id", authMiddleware, urlController.updateSlug);

export default router;