import { generateSlug } from "../../../utils/slugGenerator";
import VisitRepository from "../../visit/repositories/visit.repository";
import UrlRepository from "../repositories/url.repository";

class UrlService {
  static async createShortUrl(originalUrl: string, userId: string) {
    const slug = generateSlug();
    return await UrlRepository.saveUrl(slug, originalUrl, userId);
  }

  static async getOriginalUrl(slug: string, ip?: string, userAgent?: string) {
    const url = await UrlRepository.findUrlBySlug(slug);
    if (!url) return null;
    await VisitRepository.logVisit(url.id, ip, userAgent);
    return url.originalUrl;
  }

  static async getAll() {
    return UrlRepository.findAll();
  }

  static async getByUserId(userId: string) {
    return UrlRepository.findUrlsByUserId(userId);
  }
}

export default UrlService;
