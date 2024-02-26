import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { test, describe, beforeEach, expect } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Caso de uso de busca de academias", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  test("Deve ser possível buscar por academias", async () => {
    await gymsRepository.create({
      title: "Node.js Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await gymsRepository.create({
      title: "Java Gym",
      description: null,
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    const { gyms } = await sut.execute({
      search: "Java",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Java Gym" })]);
  });

  test.skip("Deve ser possível buscar academias com paginação", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Node.js Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      });
    }

    const { gyms } = await sut.execute({
      search: "Node.js",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ gym_id: "Node.js 21" }),
      expect.objectContaining({ gym_id: "Node.js 22" }),
    ]);
  });
});
