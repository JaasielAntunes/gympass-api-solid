import { FastifyInstance } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

export async function authenticateController(app: FastifyInstance) {
  app.post("/", async (req, res) => {
    const authenticateUserBody = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = authenticateUserBody.parse(req.body);

    try {
      const usersRepository = new PrismaUsersRepository();
      const authenticateUseCase = new AuthenticateUseCase(usersRepository);

      await authenticateUseCase.execute({
        email,
        password,
      });
    } catch (e) {
      if (e instanceof InvalidCredentialsError) {
        return res.status(400).send({ message: e.message });
      }

      throw e;
    }

    return res.status(200).send();
  });
}
