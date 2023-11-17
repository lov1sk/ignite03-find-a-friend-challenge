import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { SearchPetsUseCase } from "../search-pets";
import { AdoptPetUseCase } from "../adopt-pet";
import { PrismaOngsRepository } from "@/repositories/prisma/prisma-ongs-repository";

export function makeAdoptPetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const ongsRepository = new PrismaOngsRepository();
  const adoptPetUseCase = new AdoptPetUseCase(ongsRepository, petsRepository);

  return adoptPetUseCase;
}
