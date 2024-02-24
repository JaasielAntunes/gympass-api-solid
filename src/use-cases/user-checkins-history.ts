/* eslint-disable prettier/prettier */
import { CheckInsRepository } from "./../repositories/check-ins-repository";
import { CheckIn } from "@prisma/client";

interface UserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface UserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class UserCheckInsHistoryUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
  ) { }

  async execute({
    userId,
    page,
  }: UserCheckInsHistoryUseCaseRequest): Promise<UserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page);
    return { checkIns };
  }
}
