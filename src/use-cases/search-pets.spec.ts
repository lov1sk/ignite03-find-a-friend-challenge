import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPetsUseCase } from "./search-pets";
import { InMemoryOngRepository } from "@/repositories/in-memory/in-memory-ong-repository";
import { hash } from "bcryptjs";

let petsRepository: InMemoryPetRepository;
let ongsRepository: InMemoryOngRepository;
let sut: SearchPetsUseCase;

describe("Fetch Pet Details Use Case", () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngRepository();
    petsRepository = new InMemoryPetRepository();
    sut = new SearchPetsUseCase(petsRepository);
  });

  it("should be able to get pets by his caracteristics", async () => {
    ongsRepository.ongs.push({
      id: "1",
      name: "ong test",
      city: "São Paulo",
      address: "Rua teste",
      zipcode: "05886010",
      email: "test@example.com",
      password_hash: await hash("34791034", 6),
      whatsapp: "11 951759923",
      created_at: new Date(),
    });

    petsRepository.pets.push({
      id: "1",
      name: "Pet 01",
      about: "A new Pet",
      age: "Child",
      energy: "Low",
      size: "Small",
      independence: "Low",
      created_at: new Date(),
      ong_id: "1",
    });
    petsRepository.pets.push({
      id: "2",
      name: "Pet 01",
      about: "A new Pet",
      age: "Child",
      energy: "Low",
      size: "Small",
      independence: "Low",
      created_at: new Date(),
      ong_id: "1",
    });
    petsRepository.pets.push({
      id: "3",
      name: "Pet 01",
      about: "A new Pet",
      age: "Child",
      energy: "Low",
      size: "Small",
      independence: "Medium",
      created_at: new Date(),
      ong_id: "1",
    });
    const { pets } = await sut.execute({
      city: "São Paulo",
      caracteristics: {
        independence: "Low",
      },
      ongInstance: ongsRepository,
    });

    expect(pets).toHaveLength(2);
  });
});
