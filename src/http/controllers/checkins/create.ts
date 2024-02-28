import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCheckInUseCase } from "@/use-cases/factories/make-checkin-use-case";

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createCheckInParams = z.object({
    gymId: z.string().uuid(),
  });

  const createCheckInBody = z.object({
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { gymId } = createCheckInParams.parse(req.params);
  const { latitude, longitude } = createCheckInBody.parse(req.body);

  const checkInUseCase = makeCheckInUseCase();

  await checkInUseCase.execute({
    gymId,
    userId: req.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return res.status(201).send();
}
