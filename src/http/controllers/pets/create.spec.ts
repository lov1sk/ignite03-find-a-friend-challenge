import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { createOngAndPets } from "@/utils/test/create-a-ong-and-pets";
import { InMemoryOngRepository } from "@/repositories/in-memory/in-memory-ong-repository";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("Create Pet e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to create a new pet", async () => {
    const ong = await prisma.ong.create({
      data: {
        name: "ong test",
        city: "São Paulo",
        address: "Rua teste",
        zipcode: "05886010",
        email: "test@example.com",
        password_hash: await hash("34791034", 6),
        whatsapp: "11 951759923",
      },
    });

    const authResponse = await request(app.server).post("/ongs/sign-in").send({
      email: "test@example.com",
      password: "34791034",
    });

    const { token } = authResponse.body;

    const response = await request(app.server)
      .post(`/ongs/${ong.id}/pets`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Pet 01",
        about: "A new Pet",
        age: "Child",
        energy: "Low",
        size: "Small",
        independence: "Low",
        ong_id: ong.id,
      });

    const { pet } = response.body;
    expect(response.status).toEqual(201);
    expect(pet.id).toEqual(expect.any(String));
  });
});
