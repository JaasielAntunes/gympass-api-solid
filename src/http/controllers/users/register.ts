import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-alredy-exists";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export async function register(req: FastifyRequest, res: FastifyReply) {
  const createUserBody = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = createUserBody.parse(req.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      email,
      password,
    });
  } catch (e) {
    if (e instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: e.message });
    }

    throw e;
  }

  return res.status(201).send("Usuário cadastrado com sucesso!");
}
