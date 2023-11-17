import { InMemoryOngRepository } from "@/repositories/in-memory/in-memory-ong-repository";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { Ong, Pet } from "@prisma/client";
import { hash } from "bcryptjs";

type createOngAndPetsRequest = {
  ongsQuantity: number;
  petsQuantity: number;
  ongsRepository: InMemoryOngRepository;
  petsRepository: InMemoryPetRepository;
};

type createOngAndPetsResponse = {
  pet: Pet;
  ong: Ong;
};

export async function createOngAndPets({
  ongsQuantity = 1,
  petsQuantity = 1,
  ongsRepository,
  petsRepository,
}: createOngAndPetsRequest): Promise<createOngAndPetsResponse> {
  /**
   * Criação de ongs
   */
  for (let i = 0; i < ongsQuantity; i++) {
    ongsRepository.ongs.push({
      id: `Ong-${i + 1}`,
      name: "ong test",
      city: "São Paulo",
      address: "Rua teste",
      zipcode: "05886010",
      email: "test@example.com",
      password_hash: await hash("34791034", 6),
      whatsapp: "11 951759923",
      created_at: new Date(),
    });
  }
  /**
   * Criação de pets
   */
  for (let i = 0; i < petsQuantity; i++) {
    petsRepository.pets.push({
      id: `Pet-${i + 1}`,
      name: "Pet 01",
      about: "A new Pet",
      age: "Child",
      energy: "Low",
      size: "Small",
      independenceLevel: "Low",
      ong_id: `Ong-1`,
      created_at: new Date(),
    });
  }

  return {
    pet: petsRepository.pets[0],
    ong: ongsRepository.ongs[0],
  };
}
