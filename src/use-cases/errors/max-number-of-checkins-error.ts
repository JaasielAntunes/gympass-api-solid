export class MaxNumberOfCheckinsError extends Error {
  constructor() {
    super("Número máximo de check-ins alcançado!");
  }
}
