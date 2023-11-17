import { app } from "@/app";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { auth } from "./auth";

export async function ongsRoutes(app: FastifyInstance) {
  app.post("/ongs", create);
  app.post("/ongs/sign-in", auth);
}
