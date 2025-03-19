import prisma from "../../../database/prismaClient";

class UserRepository {
  static async createUser(email: string, password: string) {
    return prisma.user.create({
      data: { email, password }
    })
  }

  static async findUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } })
  }
}

export default UserRepository;