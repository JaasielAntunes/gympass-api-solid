import { expect, test, describe } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Caso de uso de autenticação", () => {
  test("Deve ser possível realizar autenticação", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "Carlos Alves",
      email: "carlos@example.com",
      password_hash: await hash("1234", 6),
    });

    const { user } = await sut.execute({
      email: "carlos@example.com",
      password: "1234",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test("Não deve ser possível realizar autenticação com email inválido", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    expect(() =>
      sut.execute({
        email: "carlos@example.com",
        password: "1234",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  test("Não deve ser possível realizar autenticação com senha inválida", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    expect(() =>
      sut.execute({
        email: "carlos@example.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
