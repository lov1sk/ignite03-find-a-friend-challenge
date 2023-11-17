import { PrismaOngsRepository } from "@/repositories/prisma/prisma-ongs-repository";
import { AuthenticateOngUseCase } from "../authenticate-ong";

export function makeAuthenticateOngUseCase() {
  const ongsRepository = new PrismaOngsRepository();
  const authenticateOngUseCase = new AuthenticateOngUseCase(ongsRepository);

  return authenticateOngUseCase;
}
