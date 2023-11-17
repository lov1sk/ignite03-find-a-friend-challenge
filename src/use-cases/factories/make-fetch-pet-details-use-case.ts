import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FetchPetDetailsUseCase } from "../fetch-pet-details";

export function makeFetchPetDetailsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const fetchPetDetailsUseCase = new FetchPetDetailsUseCase(petsRepository);

  return fetchPetDetailsUseCase;
}
