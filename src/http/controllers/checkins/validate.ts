import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-checkin-use-case";

export async function validate(req: FastifyRequest, res: FastifyReply) {
  const validateCheckInParams = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParams.parse(req.params);

  const validateCheckInUseCase = makeValidateCheckInUseCase();

  await validateCheckInUseCase.execute({
    checkInId,
  });

  return res.status(204).send();
}
