import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export async function registerController(app: FastifyInstance) {
  app.post("/", async (req, res) => {
    const createUserBody = z.object({
      name: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { name, email, password } = createUserBody.parse(req.body);

    const password_hash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      return res.status(409).send({ message: "E-mail já existente!" });
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    });

    return res.status(201).send("Usuário cadastrado com sucesso!");
  });
}
