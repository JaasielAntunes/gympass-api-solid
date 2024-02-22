import { expect, test, describe, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-alredy-exists";
import { compare } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Caso de uso de cadastro", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  test("Deve ser possível realizar o cadastro", async () => {
    const { user } = await sut.execute({
      name: "Carlos Alves",
      email: "carlos@example.com",
      password: "1234",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test("Deve ser gerado um hash de senha no momento do cadastro", async () => {
    const { user } = await sut.execute({
      name: "Carlos Alves",
      email: "carlos@example.com",
      password: "1234",
    });

    const isPasswordCorrectlyHashed = await compare("1234", user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  test("Não deve ser possivel se cadastrar com o mesmo email", async () => {
    const email = "carlos@example.com";

    await sut.execute({
      name: "Carlos Alves",
      email,
      password: "1234",
    });

    await expect(() =>
      sut.execute({
        name: "Carlos Alves",
        email,
        password: "1234",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
