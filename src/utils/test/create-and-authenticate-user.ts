import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: "Teste E2E",
      email: "testee2e@example.com",
      password_hash: await hash("123321", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });

  const authResponse = await request(app.server).post("/sessions").send({
    email: "testee2e@example.com",
    password: "123321",
  });

  const { token } = authResponse.body;

  return {
    token,
  };
}
