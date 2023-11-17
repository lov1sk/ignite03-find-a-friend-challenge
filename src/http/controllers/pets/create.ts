import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeCreatePetUseCase } from "@/use-cases/factories/make-create-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetRequestSchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy: z.string(),
    independence: z.string(),
  });

  const createPetParamsSchema = z.object({
    ongId: z.string(),
  });

  const { name, about, age, energy, independence, size } =
    createPetRequestSchema.parse(request.body);
  const { ongId: ong_id } = createPetParamsSchema.parse(request.params);

  try {
    const createPetUseCase = makeCreatePetUseCase();
    const { pet } = await createPetUseCase.execute({
      name,
      about,
      age,
      energy,
      independence,
      size,
      ong_id,
    });
    return reply.status(201).send({ pet });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message });
    }
  }
}
