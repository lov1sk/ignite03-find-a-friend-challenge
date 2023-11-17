import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOngRepository } from "@/repositories/in-memory/in-memory-ong-repository";
import { AuthenticateOngUseCase } from "./authenticate-ong";
import { hash } from "bcryptjs";
import { randomUUID } from "crypto";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InvalidOngPasswordError } from "./errors/invalid-ong-password-error";

let ongsRepository: InMemoryOngRepository;
let sut: AuthenticateOngUseCase;

describe("Authenticate Ong Use Case", () => {
  beforeEach(async () => {
    ongsRepository = new InMemoryOngRepository();
    sut = new AuthenticateOngUseCase(ongsRepository);

    ongsRepository.ongs.push({
      id: randomUUID(),
      name: "ong test",
      city: "São Paulo",
      address: "Rua teste",
      zipcode: "05886010",
      email: "test@example.com",
      password_hash: await hash("34791034", 6),
      whatsapp: "11 951759923",
      created_at: new Date(),
    });
  });

  it("should be able to create and authenticate a ong", async () => {
    const { ong } = await sut.execute({
      email: "test@example.com",
      password: "34791034",
    });

    expect(ong.id).toEqual(expect.any(String));
  });
  it("not should be able to authenticate a ong with a wrong email", async () => {
    await expect(
      sut.execute({
        email: "test@example.co",
        password: "34791034",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
  it("not should be able to authenticate a ong with a wrong password", async () => {
    await expect(
      sut.execute({
        email: "test@example.com",
        password: "3479103",
      })
    ).rejects.toBeInstanceOf(InvalidOngPasswordError);
  });
});
