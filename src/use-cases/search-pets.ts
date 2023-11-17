import { InMemoryOngRepository } from "@/repositories/in-memory/in-memory-ong-repository";
import { IPetRepository, caracteristic } from "@/repositories/pet-repository";
import { Pet } from "@prisma/client";

interface SearchPetsUseCaseRequest {
  city: string;
  caracteristics?: caracteristic;
  ongInstance?: InMemoryOngRepository;
}

interface SearchPetsUseCaseResponse {
  pets: Pet[];
}

export class SearchPetsUseCase {
  constructor(private petRepository: IPetRepository) {}
  async execute({
    city,
    caracteristics,
    ongInstance,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    /**
     * Se não forem passados filtros listar todos os pets da cidade
     */

    const areSomeCaracteristicsAvailable = Boolean(
      caracteristics?.age ||
        caracteristics?.energy ||
        caracteristics?.size ||
        caracteristics?.independence
    );

    if (!caracteristics || !areSomeCaracteristicsAvailable) {
      const pets = await this.petRepository.findManyByCity(city, ongInstance);
      return { pets };
    }

    // age: valor

    const pets = await this.petRepository.searchPetsByQuery(
      city,
      caracteristics,
      ongInstance
    );

    return {
      pets,
    };
  }
}
