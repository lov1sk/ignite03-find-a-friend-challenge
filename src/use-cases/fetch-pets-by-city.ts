import { IPetRepository } from "@/repositories/pet-repository";
import { Pet } from "@prisma/client";
import { InMemoryOngRepository } from "@/repositories/in-memory/in-memory-ong-repository";

interface FetchPetsByCityUseCaseRequest {
  city: string;
  ongInstance?: InMemoryOngRepository;
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[];
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: IPetRepository) {}
  async execute({
    city,
    ongInstance,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(city, ongInstance);
    return {
      pets,
    };
  }
}
