import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";

describe("Create Ong e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to create a new ong", async () => {
    const response = await request(app.server).post("/ongs").send({
      name: "ong test",
      city: "São Paulo",
      address: "Rua teste",
      zipcode: "05886010",
      email: "test@example.com",
      password: "34791034",
      whatsapp: "11 951759923",
    });

    const { ong } = response.body;

    expect(response.status).toEqual(201);
    expect(ong.id).toEqual(expect.any(String));
  });
});
