import prisma from "../../../database/prismaClient";

class UrlRepository {
  async saveUrl(slug: string, originalUrl: string, userId: string) {
    return prisma.url.create({ data: { slug, originalUrl, userId } });
  }

  async findUrlBySlug(slug: string) {
    const url = await prisma.url.findUnique({ where: { slug } });
    return url || null;
  }

  async findAll() {
    return prisma.url.findMany();
  }

  async findUrlsByUserId(userId: string) {
    return prisma.url.findMany({ where: { userId } })
  }

  async updateUrl(id: string, newSlug: string, userId: string) {
    return prisma.url.update({
      where: { id, userId },
      data: { slug: newSlug }
    })
  }
}

export default UrlRepository;
