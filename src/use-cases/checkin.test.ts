import { test, describe, beforeEach, expect } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./checkin";

let checkInRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Caso de uso de CheckIn", () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInRepository);
  });

  test("Deve ser possível realizar o check-in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
