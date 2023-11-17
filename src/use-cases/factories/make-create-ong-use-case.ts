import { InMemoryOngRepository } from "@/repositories/in-memory/in-memory-ong-repository";
import { CreateOngUseCase } from "../create-ong";
import { PrismaOngsRepository } from "@/repositories/prisma/prisma-ongs-repository";

export function makeCreateOngUseCase() {
  const ongsRepository = new PrismaOngsRepository();
  const createOngUseCase = new CreateOngUseCase(ongsRepository);

  return createOngUseCase;
}
