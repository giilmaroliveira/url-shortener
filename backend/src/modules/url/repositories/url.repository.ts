import prisma from "../../../database/prismaClient";

class UrlRepository {
  static async saveUrl(slug: string, originalUrl: string, userId: string) {
    return prisma.url.create({ data: { slug, originalUrl, userId } });
  }

  static async findUrlBySlug(slug: string) {
    const url = await prisma.url.findUnique({ where: { slug } });
    return url || null;
  }

  static async findAll() {
    return prisma.url.findMany();
  }

  static async findUrlsByUserId(userId: string) {
    return prisma.url.findMany({ where: { userId } })
  }
}

export default UrlRepository;
