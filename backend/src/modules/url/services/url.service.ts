import { generateSlug } from "../../../utils/slugGenerator";
import VisitRepository from "../../visit/repositories/visit.repository";
import UrlRepository from "../repositories/url.repository";

class UrlService {
  private urlRepository: UrlRepository;
  constructor(urlRepository: UrlRepository) {
    this.urlRepository = urlRepository;

    this.createShortUrl = this.createShortUrl.bind(this);
    this.getOriginalUrl = this.getOriginalUrl.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getByUserId = this.getByUserId.bind(this);
  }
  async createShortUrl(originalUrl: string, userId: string) {
    const slug = generateSlug();
    return await this.urlRepository.saveUrl(slug, originalUrl, userId);
  }

  async getOriginalUrl(slug: string, ip?: string, userAgent?: string) {
    const url = await this.urlRepository.findUrlBySlug(slug);
    if (!url) return null;
    await VisitRepository.logVisit(url.id, ip, userAgent);
    return url.originalUrl;
  }

  async getAll() {
    return this.urlRepository.findAll();
  }

  async getByUserId(userId: string) {
    return this.urlRepository.findUrlsByUserId(userId);
  }
}

export default UrlService;
