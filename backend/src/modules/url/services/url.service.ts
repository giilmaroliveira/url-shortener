import { generateSlug } from "../../../utils/slugGenerator";
import VisitRepository from "../../visit/repository/visit.repository";
import UrlRepository from "../repositories/url.repository";

class UrlService {
  static async createShortUrl(originalUrl: string) {
    const slug = generateSlug();
    return await UrlRepository.saveUrl(slug, originalUrl);
  }

  static async getOriginalUrl(slug: string, ip?: string, userAgent?: string) {
    const url = await UrlRepository.findUrlBySlug(slug);
    if (!url) return null;
    await VisitRepository.logVisit(url.id, ip, userAgent);
    return url.originalUrl;
  }
}

export default UrlService;
