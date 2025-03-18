import prisma from "../../../database/prismaClient";

class UrlRepository {
  static async saveUrl(slug: string, originalUrl: string) {
    return prisma.url.create({ data: { slug, originalUrl } });
  }

  static async findUrlBySlug(slug: string) {
    const url = await prisma.url.findUnique({ where: { slug } });
    return url || null;
  }
}

export default UrlRepository;
