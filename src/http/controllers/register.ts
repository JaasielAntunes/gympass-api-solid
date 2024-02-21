import { FastifyInstance } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export async function registerController(app: FastifyInstance) {
  app.post("/", async (req, res) => {
    const createUserBody = z.object({
      name: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = createUserBody.parse(req.body);

    try {
      const usersRepository = new PrismaUsersRepository();
      const registerUseCase = new RegisterUseCase(usersRepository);

      await registerUseCase.execute({
        name,
        email,
        password,
      });
    } catch (err) {
      return res.status(409).send();
    }

    return res.status(201).send();
  });
}
