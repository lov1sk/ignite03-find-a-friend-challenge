import { IPetRepository } from "@/repositories/pet-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchPetDetailsUseCaseRequest {
  petId: string;
}

interface FetchPetDetailsUseCaseResponse {
  pet: Pet;
}

export class FetchPetDetailsUseCase {
  constructor(private petRepository: IPetRepository) {}
  async execute({
    petId,
  }: FetchPetDetailsUseCaseRequest): Promise<FetchPetDetailsUseCaseResponse> {
    const pet = await this.petRepository.findPetById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return {
      pet,
    };
  }
}
