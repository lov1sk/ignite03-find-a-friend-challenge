import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOngRepository } from "@/repositories/in-memory/in-memory-ong-repository";
import { CreateOngUseCase } from "./create-ong";
import { OngAlreadyExistsError } from "./errors/ong-already-exists-error";

let ongsRepository: InMemoryOngRepository;
let sut: CreateOngUseCase;

describe("Create Ong Use Case", () => {
  beforeEach(() => {
    ongsRepository = new InMemoryOngRepository();
    sut = new CreateOngUseCase(ongsRepository);
  });

  it("should be able to create a ong", async () => {
    const { ong } = await sut.execute({
      name: "ong test",
      city: "São Paulo",
      address: "Rua teste",
      zipcode: "05886010",
      email: "test@example.com",
      password: "34791034",
      whatsapp: "11 951759923",
    });

    expect(ong.id).toEqual(expect.any(String));
  });
  it("not should be able to create a ong with a duplicate email", async () => {
    await sut.execute({
      name: "ong test",
      city: "São Paulo",
      address: "Rua teste",
      zipcode: "05886010",
      email: "test@example.com",
      password: "34791034",
      whatsapp: "11 951759923",
    });

    await expect(
      sut.execute({
        name: "ong test",
        city: "São Paulo",
        address: "Rua teste",
        zipcode: "05886010",
        email: "test@example.com",
        password: "34791034",
        whatsapp: "11 951759923",
      })
    ).rejects.toBeInstanceOf(OngAlreadyExistsError);
  });
});
