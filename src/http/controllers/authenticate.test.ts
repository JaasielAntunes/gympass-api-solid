import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

describe("Perfil (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("Deve ser possível obter o perfil", async () => {
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

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: "testee2e@example.com",
      }),
    );
  });
});
