import { expect, test, describe, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { UserProfileUseCase } from "./user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: UserProfileUseCase;

describe("Caso de uso de perfil do usuário", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UserProfileUseCase(usersRepository);
  });

  test("Deve ser possível cadastrar um usuário", async () => {
    const createdUser = await usersRepository.create({
      name: "Carlos Alves",
      email: "carlos@example.com",
      password_hash: await hash("1234", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual("Carlos Alves");
  });

  test("Não deve ser possível obter o perfil do usuário com id inválido", async () => {
    expect(() =>
      sut.execute({
        userId: "invalid-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
