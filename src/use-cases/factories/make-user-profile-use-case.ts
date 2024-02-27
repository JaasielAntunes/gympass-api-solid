import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserProfileUseCase } from "../user-profile";

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new UserProfileUseCase(usersRepository);

  return useCase;
}
