import { FastifyInstance } from "fastify";
import { z } from "zod";
import { registerUseCase } from "@/use-cases/register";

export async function registerController(app: FastifyInstance) {
  app.post("/", async (req, res) => {
    const createUserBody = z.object({
      name: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = createUserBody.parse(req.body);

    try {
      await registerUseCase({
        name,
        email,
        password,
      });
    } catch (e) {
      return res.status(409).send();
    }

    return res.status(201).send("Usuário cadastrado com sucesso!");
  });
}
