import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Cadastrar CheckIn (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  test("Deve ser possiível criar um checkin", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "JavaScript Academia",
        latitude: -27.2092052,
        longitude: -49.6401091,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/checkins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -27.2092052,
        longitude: -49.6401091,
      });

    expect(response.statusCode).toEqual(201);
  });
});
