import { generateSlug } from "../../../utils/slugGenerator";
import UrlRepository from "../repositories/url.repository";

class UrlService {
  static async createShortUrl(originalUrl: string) {
    const slug = generateSlug();
    return await UrlRepository.saveUrl(slug, originalUrl);
  }

  static async getOriginalUrl(slug: string) {
    return await UrlRepository.findUrlBySlug(slug);
  }
}

export default UrlService;
