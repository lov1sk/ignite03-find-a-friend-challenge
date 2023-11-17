import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchPetDetailsUseCase } from "./fetch-pet-details";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let petsRepository: InMemoryPetRepository;
let sut: FetchPetDetailsUseCase;

describe("Fetch Pet Details Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository();
    sut = new FetchPetDetailsUseCase(petsRepository);

    /**
     * Antes de cada teste cria um pet
     */
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
  });

  it("should be able to get the details of a especific pet", async () => {
    const { pet } = await sut.execute({ petId: "1" });
    expect(pet.name).toEqual("Pet 01");
  });
  it("not should be able to get the details of a pet with wrong id", async () => {
    await expect(sut.execute({ petId: "2" })).rejects.toBeInstanceOf(
      ResourceNotFoundError
    );
  });
});
