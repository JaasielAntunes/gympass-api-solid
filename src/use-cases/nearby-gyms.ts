import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface NearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface NearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class NearbyGymsUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private gymsRepository: GymsRepository) { }

  async execute({
    userLatitude,
    userLongitude,
  }: NearbyGymsUseCaseRequest): Promise<NearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
