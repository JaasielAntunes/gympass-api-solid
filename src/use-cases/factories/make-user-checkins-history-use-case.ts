import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-checkins-repository";
import { UserCheckInsHistoryUseCase } from "../user-checkins-history";

export function makeUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new UserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}
