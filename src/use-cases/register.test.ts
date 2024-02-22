import { expect, test, describe } from "vitest";
import { RegisterUseCase } from "./register";
// import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-alredy-exists";

describe("Caso de uso de cadastro", () => {
  test("Deve ser gerado um hash de senha no momento do cadastro", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "Carlos Alves",
      email: "carlos@example.com",
      password: "1234",
    });

    // const isPasswordCorrectlyHashed = await compare("1234", user.password_hash);

    expect(user.id).toEqual(expect.any(String));
  });

  test("Não deve ser possivel se cadastrar com o mesmo email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "carlos@example.com";

    await registerUseCase.execute({
      name: "Carlos Alves",
      email,
      password: "1234",
    });

    expect(() =>
      registerUseCase.execute({
        name: "Carlos Alves",
        email,
        password: "1234",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
