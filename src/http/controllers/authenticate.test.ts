import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

describe("Autenticação (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("Deve ser possível realizar autenticação", async () => {
    await request(app.server).post("/users").send({
      name: "Teste E2E",
      email: "testee2e@example.com",
      password: "123321",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "testee2e@example.com",
      password: "123321",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
