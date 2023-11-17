import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import { createPetsOnPrisma } from "@/utils/test/create-pets-on-prisma";
import request from "supertest";

describe("Adopt a Pet e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to find a existent pet, and show contact of a ong to adopt", async () => {
    const { pets } = await createPetsOnPrisma({
      petsQuantity: 5,
    });
    const response = await request(app.server)
      .get(`/pets/${pets[0].id}/adopt`)
      .send();

    const { pet, ong } = response.body;

    expect(response.status).toEqual(200);
    expect(ong.whatsapp).toEqual(expect.any(String));
  });
});
