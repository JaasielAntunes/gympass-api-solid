import { expect, test, describe } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

describe("Caso de uso de cadastro", () => {
  test("Deve ser gerado um hash de senha no momento do cadastro", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "Carlos Alves",
      email: "carlos@example.com",
      password: "1234",
    });

    const isPasswordCorrectlyHashed = await compare("1234", user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
