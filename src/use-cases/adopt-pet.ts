import { IOngRepository } from "@/repositories/ongs-repository";
import { IPetRepository } from "@/repositories/pet-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { Ong, Pet } from "@prisma/client";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";

interface AdoptPetUseCaseRequest {
  petId: string;
}
interface AdoptPetUseCaseResponse {
  pet: Pet;
  ong: Ong;
}

export class AdoptPetUseCase {
  constructor(
    private ongsRepository: IOngRepository,
    private petsRepository: IPetRepository
  ) {}

  async execute({
    petId,
  }: AdoptPetUseCaseRequest): Promise<AdoptPetUseCaseResponse> {
    // se o repositorio for in memory, fazer o codigo abaixo
    if (this.petsRepository instanceof InMemoryPetRepository) {
      const pet = await this.petsRepository.findPetById(petId);
      if (!pet) {
        throw new ResourceNotFoundError();
      }

      const ong = await this.ongsRepository.findOngById(pet.ong_id);

      if (!ong) {
        throw new ResourceNotFoundError();
      }
      if (pet.ong_id !== ong.id) {
        throw new Error("This pet is not available for this ong");
      }
      return {
        ong,
        pet,
      };
    }

    const pet: any = await this.petsRepository.findPetById(petId);
    if (!pet) {
      throw new ResourceNotFoundError();
    }
    return {
      pet,
      ong: pet.ongs,
    };
  }
}
