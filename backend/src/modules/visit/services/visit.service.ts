import UrlRepository from "../../url/repositories/url.repository";
import VisitRepository from "../repositories/visit.repository";

class VisitService {
  static async getVisitStats(slug: string) {
    const url = await UrlRepository.findUrlBySlug(slug);
    if (!url) return null;
    const visitCount = await VisitRepository.getVisitCount(url.id);
    return visitCount;
  }
}

export default VisitService;
