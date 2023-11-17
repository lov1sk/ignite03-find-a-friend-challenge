import { app } from "@/app";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { findAPet } from "./find-a-pet";
import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { searchPets } from "./search-pets";
import { adoptAPet } from "./adopt-a-pet";
export async function petsRoutes(app: FastifyInstance) {
  app.post("/ongs/:ongId/pets", { onRequest: [verifyJwt] }, create);
  app.get("/pets/:petId", findAPet);
  app.get("/pets", searchPets);
  app.get("/pets/:petId/adopt", adoptAPet);
}
