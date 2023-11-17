import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("Authenticate Ong e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to authenticate a ong", async () => {
    await prisma.ong.create({
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
    const response = await request(app.server).post("/ongs/sign-in").send({
      email: "test@example.com",
      password: "34791034",
    });

    const { token } = response.body;
    const [refreshToken] = response.get("Set-Cookie");

    expect(response.status).toEqual(200);
    expect(token).toEqual(expect.any(String));
    expect(refreshToken).toEqual(expect.stringContaining("refreshToken="));
  });
});
