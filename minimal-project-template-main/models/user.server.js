import { prisma } from "../db.server.js";

export async function getUserById(id) {
  return prisma.user.findUnique({ where: { id } });
}