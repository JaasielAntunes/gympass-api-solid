import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/", async (req, res) => {
    const createUserBody = z.object({
      name: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = createUserBody.parse(req.body);

    await prisma.user.create({
      data: {
        name,
        email,
        password_hash: password,
      },
    });

    return res.status(201).send("Usuário cadastrado com sucesso!");
  });
}
