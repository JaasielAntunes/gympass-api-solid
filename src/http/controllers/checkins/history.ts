import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-user-checkins-history-use-case";

export async function history(req: FastifyRequest, res: FastifyReply) {
  const checkInHistoryQuery = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuery.parse(req.query);

  const userCheckInsHistoryUseCase = makeUserCheckInsHistoryUseCase();

  const { checkIns } = await userCheckInsHistoryUseCase.execute({
    page,
    userId: req.user.sub,
  });

  return res.status(200).send({
    checkIns,
  });
}
