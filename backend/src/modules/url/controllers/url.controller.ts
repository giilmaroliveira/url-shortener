import { Request, Response } from "express";
import UrlService from "../services/url.service";
import logger from "../../../config/logger";
import { validateUrlInput } from "../validators/url.validator";

class UrlController {
  private urlService: UrlService;
  constructor(urlService: UrlService) {
    this.urlService = urlService;

    this.shortenUrl = this.shortenUrl.bind(this);
    this.redirect = this.redirect.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getUserUrls = this.getUserUrls.bind(this);
    this.updateSlug = this.updateSlug.bind(this);
  }
  async shortenUrl(req: Request, res: Response) {
    try {
      const validationError = validateUrlInput(req.body);
      if (validationError) {
        res.status(400).json({ error: validationError });
        return;
      }
      const { originalUrl } = req.body;
      const userId = req.user?.id || "";
      const shortUrl = await this.urlService.createShortUrl(originalUrl, userId);
      logger.info(`URL shortned: ${originalUrl} -> ${shortUrl.slug}`);
      res.json({ shortUrl });
    } catch (error: unknown) {
      logger.error(`Error shortening URL: ${error}`);
      const errMsg = error instanceof Error ? error.message : "Something went wrong";
      res.status(400).json({ error: errMsg });
    }
  }

  async redirect(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      const userAgent = req.headers["user-agent"];

      const originalUrl = await this.urlService.getOriginalUrl(slug, ip as string, userAgent);
      if (!originalUrl) {
        logger.warn(`Invalid slug access: ${slug}`);
        res.status(404).send("Not Found");
        return;
      }
      logger.info(`Redirecting ${slug} -> ${originalUrl} | IP: ${ip}`);
      res.redirect(originalUrl);
    } catch (error: unknown) {
      logger.error(`Redirect error ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const urls = await this.urlService.getAll();
    res.json(urls)
  }

  async getUserUrls(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || "";
    const urls = await this.urlService.getByUserId(userId);
    res.json(urls)
  }

  async updateSlug(req: Request, res: Response): Promise<void> {
    try {
      const { newSlug } = req.body;
      const { id } = req.params;
      const userId = req.user?.id || "";

      const updatedUrl = await this.urlService.updateSlug(id, newSlug, userId);
      if (!updatedUrl) {
        res.status(400).json({ error: 'Slug already in use.' });
        return;
      }

      res.json({ message: "Slug updated successfully", url: updatedUrl })
    } catch (error) {
      logger.error(`Error updating slug: ${error}`);
      const errMsg = error instanceof Error ? error.message : "Something went wrong";
      res.status(500).json({ error: errMsg });
    }
  }

}

export default UrlController;
