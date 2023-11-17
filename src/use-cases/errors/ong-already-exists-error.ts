export class OngAlreadyExistsError extends Error {
  constructor() {
    super("Cannot save a ong with duplicate email");
  }
}
