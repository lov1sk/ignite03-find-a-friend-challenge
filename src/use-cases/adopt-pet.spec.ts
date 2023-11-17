import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOngRepository } from "@/repositories/in-memory/in-memory-ong-repository";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { AdoptPetUseCase } from "./adopt-pet";
import { createOngAndPets } from "@/utils/test/create-a-ong-and-pets";

let petsRepository: InMemoryPetRepository;
let ongsRepository: InMemoryOngRepository;
let sut: AdoptPetUseCase;

describe("Create Ong Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository();
    ongsRepository = new InMemoryOngRepository();
    sut = new AdoptPetUseCase(ongsRepository, petsRepository);
  });

  it("should be able to adopt a pet", async () => {
    const { pet } = await createOngAndPets({
      ongsQuantity: 2,
      petsQuantity: 2,
      ongsRepository,
      petsRepository,
    });

    const { ong } = await sut.execute({
      petId: pet.id,
    });
    expect(ong.whatsapp).toEqual(expect.any(String));
  });
});
