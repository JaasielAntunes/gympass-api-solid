import { expect, test, describe, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Caso de uso de autenticação", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  test("Deve ser possível realizar autenticação", async () => {
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
    expect(() =>
      sut.execute({
        email: "carlos@example.com",
        password: "1234",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  test("Não deve ser possível realizar autenticação com senha inválida", async () => {
    expect(() =>
      sut.execute({
        email: "carlos@example.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
