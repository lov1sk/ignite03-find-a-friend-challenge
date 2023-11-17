export class InvalidOngPasswordError extends Error {
  constructor() {
    super("Please provid a valid password");
  }
}
