import { NearbyGymsUseCase } from "../nearby-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new NearbyGymsUseCase(gymsRepository);

  return useCase;
}
