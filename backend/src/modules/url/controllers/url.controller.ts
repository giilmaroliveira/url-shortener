import { Request, Response } from "express";
import UrlService from "../services/url.service";

class UrlController {
  static async shortenUrl(req: Request, res: Response) {
    try {
      const { originalUrl } = req.body;
      const shortUrl = await UrlService.createShortUrl(originalUrl);
      res.json({ shortUrl });
    } catch (error: unknown) {
      console.error(error);
      const errMsg = error instanceof Error ? error.message : "Something went wrong";
      res.status(400).json({ error: errMsg });
    }
  }

  static async redirect(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const originalUrl = await UrlService.getOriginalUrl(slug);
      if (!originalUrl) {
        res.status(404).send("Not Found");
        return;
      }
      res.redirect(originalUrl);
    } catch (error: unknown) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  
}

export default UrlController;
