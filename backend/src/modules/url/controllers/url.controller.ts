import { Request, Response } from "express";
import UrlService from "../services/url.service";

class UrlController {
  static async shortenUrl(req: Request, res: Response) {
    try {
      const { originalUrl } = req.body;
      const shortUrl = await UrlService.createShortUrl(originalUrl);
      res.json({ shortUrl });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async redirect(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const originalUrl = await UrlService.getOriginalUrl(slug);
      if (!originalUrl) return res.status(404).send("Not Found");
      res.redirect(originalUrl);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default UrlController;
