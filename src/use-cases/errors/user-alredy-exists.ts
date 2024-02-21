export class UserAlreadyExistsError extends Error {
  constructor() {
    super("Email já existente na base de dados!");
  }
}
