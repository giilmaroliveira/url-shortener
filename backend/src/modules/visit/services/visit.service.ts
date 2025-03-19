import { url } from "inspector";
import UrlRepository from "../../url/repositories/url.repository";
import VisitRepository from "../repositories/visit.repository";

class VisitService {
  private urlRepository: UrlRepository;
  constructor(urlRepository: UrlRepository) {
    this.urlRepository = urlRepository;
    this.getVisitStats = this.getVisitStats.bind(this);
  }
  async getVisitStats(slug: string) {
    const url = await this.urlRepository.findUrlBySlug(slug);
    if (!url) return null;
    const visitCount = await VisitRepository.getVisitCount(url.id);
    return visitCount;
  }
}

export default VisitService;
