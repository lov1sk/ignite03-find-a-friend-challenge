import { app } from "@/app";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { auth } from "./auth";
import { refresh } from "./refresh";

export async function ongsRoutes(app: FastifyInstance) {
  app.post("/ongs", create);
  app.post("/ongs/sign-in", auth);
  app.patch("/ongs/refresh", refresh);
}
