import fastify from "fastify";
import { registerController } from "./http/controllers/register";
import { ZodError } from "zod";
import { env } from "./env";
import { authenticateController } from "./http/controllers/authenticate";

export const app = fastify();

app.register(registerController, { prefix: "users" });
app.register(authenticateController, { prefix: "sessions" });
app.setErrorHandler((error, req, res) => {
  if (error instanceof ZodError) {
    return res
      .status(400)
      .send({ message: "Erro de validação!", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return res.status(500).send({
    message: "Erro interno no servidor! Tente novamente mais tarde.",
  });
});
