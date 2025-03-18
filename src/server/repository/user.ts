import { PrismaClient } from "@prisma/client";
import { db } from "../db";

export class UserRepository {
  static async getUserById(id: string) {
    return await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
    });
  }
}
