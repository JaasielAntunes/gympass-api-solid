import { makeNearbyGymsUseCase } from "@/use-cases/factories/make-nearby-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function nearby(req: FastifyRequest, res: FastifyReply) {
  const nearbyGymsSearch = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymsSearch.parse(req.body);

  const nearbyGymsUseCase = makeNearbyGymsUseCase();

  const { gyms } = await nearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return res.status(200).send({
    gyms,
  });
}
