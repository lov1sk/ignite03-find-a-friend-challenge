import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it, test } from "vitest";
import request from "supertest";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

describe("Refresh Ong e2e", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to refresh a jwt token for ong session", async () => {
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
    const authResponse = await request(app.server).post("/ongs/sign-in").send({
      email: "test@example.com",
      password: "34791034",
    });

    const cookies = authResponse.get("Set-Cookie");

    const refreshResponse = await request(app.server)
      .patch("/ongs/refresh")
      .set("Cookie", cookies)
      .send();

    expect(refreshResponse.status).toEqual(200);
    expect(refreshResponse.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
