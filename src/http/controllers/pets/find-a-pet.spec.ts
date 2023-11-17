import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("Find a Pet e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to find a existent pet, and show his details", async () => {
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

    const petCreated = await prisma.pet.create({
      data: {
        name: "Pet 01",
        about: "A new Pet",
        age: "Child",
        energy: "Low",
        size: "Small",
        independence: "Low",
        ong_id: ong.id,
      },
    });

    const response = await request(app.server)
      .get(`/pets/${petCreated.id}`)
      .send();

    const { pet } = response.body;
    expect(response.status).toEqual(200);
    expect(pet).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: "Pet 01",
        about: "A new Pet",
        age: "Child",
        energy: "Low",
        size: "Small",
        independence: "Low",
        ong_id: ong.id,
        created_at: expect.any(String),
      })
    );
  });
});
