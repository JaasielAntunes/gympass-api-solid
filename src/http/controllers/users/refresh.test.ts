import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

describe("Atualizar Token (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("Deve ser possível atualizar o token", async () => {
    await request(app.server).post("/users").send({
      name: "Teste E2E",
      email: "testee2e@example.com",
      password: "123321",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "testee2e@example.com",
      password: "123321",
    });

    const cookies = authResponse.get("Set-Cookie");

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
