import { FastifyInstance } from "fastify";
import request from "supertest";

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post("/users").send({
    name: "Teste E2E",
    email: "testee2e@example.com",
    password: "123321",
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
