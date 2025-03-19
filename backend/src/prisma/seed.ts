import bcrypt from "bcryptjs";  
import prisma from "../database/prismaClient";
import logger from "../config/logger";

const seed = async () => {
  const existingUser = await prisma.user.findUnique({
    where: { email: "admin@example.com" },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash("password123", 10);

    await prisma.user.create({
      data: {
        email: "admin@example.com",
        password: hashedPassword,
      },
    });

    logger.info("Default admin user created: admin@example.com | password123");
  } else {
    logger.info("Default user already exists, skipping seed.");
  }
};

seed()
  .catch((error) => {
    logger.error("Error running seed script:", error);
  })
  .finally(() => {
    prisma.$disconnect();
  });
