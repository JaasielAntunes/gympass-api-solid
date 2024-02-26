import { expect, test, describe, beforeEach } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { GymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: GymUseCase;

describe("Caso de uso de academia", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new GymUseCase(gymsRepository);
  });

  test("Deve ser possível realizar o cadastro", async () => {
    const { gym } = await sut.execute({
      title: "Java Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
