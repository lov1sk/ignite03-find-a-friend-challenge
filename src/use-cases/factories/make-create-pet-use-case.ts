import { PrismaOngsRepository } from "@/repositories/prisma/prisma-ongs-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { CreatePetUseCase } from "../create-pet";

export function makeCreatePetUseCase() {
  const ongsRepository = new PrismaOngsRepository();
  const petsRepository = new PrismaPetsRepository();
  const createPetUseCase = new CreatePetUseCase(petsRepository, ongsRepository);

  return createPetUseCase;
}
