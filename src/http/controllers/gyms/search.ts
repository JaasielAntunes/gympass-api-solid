import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function search(req: FastifyRequest, res: FastifyReply) {
  const searchGymParams = z.object({
    search: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { search, page } = searchGymParams.parse(req.body);

  const searchGymsUseCase = makeSearchGymsUseCase();

  const { gyms } = await searchGymsUseCase.execute({
    search,
    page,
  });

  return res.status(200).send({
    gyms,
  });
}
