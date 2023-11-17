import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchPetsByCityUseCase } from "./fetch-pets-by-city";
import { InMemoryOngRepository } from "@/repositories/in-memory/in-memory-ong-repository";
import { createOngAndPets } from "@/utils/test/create-a-ong-and-pets";

let petsRepository: InMemoryPetRepository;
let ongsRepository: InMemoryOngRepository;
let sut: FetchPetsByCityUseCase;

describe("Fetch Pets By City Details Use Case", () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository();
    ongsRepository = new InMemoryOngRepository();
    sut = new FetchPetsByCityUseCase(petsRepository);
  });

  it("should be able to get pets of a especific city", async () => {
    await createOngAndPets({
      ongsQuantity: 1,
      petsQuantity: 3,
      ongsRepository,
      petsRepository,
    });

    const { pets } = await sut.execute({
      city: "São Paulo",
      ongInstance: ongsRepository,
    });

    expect(pets).toHaveLength(3);
  });
});
