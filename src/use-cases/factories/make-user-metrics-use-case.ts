import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-checkins-repository";
import { GetUserMetricsUseCase } from "../user-metrics";

export function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(checkInsRepository);

  return useCase;
}
