import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { createPetsOnPrisma } from "@/utils/test/create-pets-on-prisma";

describe("Search Pets e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to find pets on a specific city", async () => {
    await createPetsOnPrisma({
      petsQuantity: 5,
    });

    const response = await request(app.server)
      .get("/pets")
      .query({
        city: "São Paulo",
        size: "Small",
        independence: "Low",
      })
      .send();

    const { pets } = response.body;
    expect(response.status).toEqual(200);
    expect(pets).toHaveLength(5);
  });
});
