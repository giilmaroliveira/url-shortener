import prisma from "../../../database/prismaClient";

class VisitRepository {
  static async logVisit(urlId: string, ip?: string, userAgent?: string) {
    return prisma.visit.create({
      data: { urlId, ip, userAgent }
    })
  }

  static async getVisitCount(urlId: string) {
    return prisma.visit.count({ where: { urlId } })
  }
}

export default VisitRepository;
