import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateUserBody = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateUserBody.parse(req.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await res.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    );

    const refreshToken = await res.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
          expiresIn: "5d",
        },
      },
    );

    return res
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
      });
  } catch (e) {
    if (e instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: e.message });
    }

    throw e;
  }
}
