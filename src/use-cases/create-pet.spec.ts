import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetUseCase } from "./create-pet";
import { InMemoryOngRepository } from "@/repositories/in-memory/in-memory-ong-repository";
import { hash } from "bcryptjs";
import { i } from "vitest/dist/reporters-5f784f42";
import { createOngAndPets } from "@/utils/test/create-a-ong-and-pets";

let petsRepository: InMemoryPetRepository;
let ongsRepository: InMemoryOngRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository();
    ongsRepository = new InMemoryOngRepository();
    sut = new CreatePetUseCase(petsRepository, ongsRepository);
  });

  it("should be able to create a pet", async () => {
    await createOngAndPets({
      ongsQuantity: 1,
      ongsRepository,
      petsQuantity: 0,
      petsRepository,
    });
    const { pet } = await sut.execute({
      name: "Pet 01",
      about: "A new Pet",
      age: "Child",
      energy: "Low",
      size: "Small",
      independence: "Low",
      ong_id: "Ong-1",
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
