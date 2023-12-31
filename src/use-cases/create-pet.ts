import { IOngRepository } from "@/repositories/ongs-repository";
import { IPetRepository } from "@/repositories/pet-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CreatePetUseCaseRequest {
  name: string;
  about: string;
  age: string;
  size: string;
  energy: string;
  independence: string;
  ong_id: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private petRepository: IPetRepository,
    private ongRepository: IOngRepository
  ) {}
  async execute({
    name,
    about,
    age,
    size,
    energy,
    independence,
    ong_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    /**
     * É Feito uma busca para verificar se a ong que esta tentando criar o pet
     * tem um registro valido salvo no banco de dados
     */
    const ongExists = await this.ongRepository.findOngById(ong_id);

    if (!ongExists) {
      throw new ResourceNotFoundError();
    }

    /**
     * Cadastra o pet na aplicação
     */
    const pet = await this.petRepository.create({
      name,
      about,
      age,
      size,
      energy,
      independence,
      ong_id,
    });

    return {
      pet,
    };
  }
}
