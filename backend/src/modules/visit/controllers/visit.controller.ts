import { Request, Response } from "express";
import VisitService from "../services/visit.service";
import logger from "../../../config/logger";

class VisitController {
  private visitService: VisitService;
  constructor(visitService: VisitService) {
    this.visitService = visitService;
    this.getVisitStats = this.getVisitStats.bind(this);
  }
  async getVisitStats(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const visitCount = await this.visitService.getVisitStats(slug);
      if (visitCount === null) {
        logger.warn(`Invalid slug: ${slug}`);
        res.status(404).json({ error: "URL not found" });
        return;
      }
      res.json({ slug, visitCount })
    } catch (error: unknown) {
      logger.error(`Redirect error ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default VisitController;
