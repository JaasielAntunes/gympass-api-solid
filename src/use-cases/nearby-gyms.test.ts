import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { test, describe, beforeEach, expect } from "vitest";
import { NearbyGymsUseCase } from "./nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: NearbyGymsUseCase;

describe("Caso de uso de busca de academias próximas", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new NearbyGymsUseCase(gymsRepository);
  });

  test("Deve ser possível buscar por academias próximas", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -27.0610928,
      longitude: -49.5229501,
    });

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
