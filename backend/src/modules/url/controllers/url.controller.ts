import { Request, Response } from "express";
import UrlService from "../services/url.service";
import logger from "../../../config/logger";

class UrlController {
  static async shortenUrl(req: Request, res: Response) {
    try {
      const { originalUrl } = req.body;
      const userId = req.user?.id || "";
      const shortUrl = await UrlService.createShortUrl(originalUrl, userId);
      logger.info(`URL shortned: ${originalUrl} -> ${shortUrl.slug}`);
      res.json({ shortUrl });
    } catch (error: unknown) {
      logger.error(`Error shortening URL: ${error}`);
      const errMsg = error instanceof Error ? error.message : "Something went wrong";
      res.status(400).json({ error: errMsg });
    }
  }

  static async redirect(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      const userAgent = req.headers["user-agent"];

      const originalUrl = await UrlService.getOriginalUrl(slug, ip as string, userAgent);
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

  static async getAll(req: Request, res: Response): Promise<void> {
    const urls = await UrlService.getAll();
    res.json(urls)
  }

  static async getUserUrls(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id || "";
    const urls = await UrlService.getByUserId(userId);
    res.json(urls)
  }

}

export default UrlController;
