import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeSearchPetsUseCase } from "@/use-cases/factories/make-search-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function searchPets(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    energy: z.string().optional(),
    independence: z.string().optional(),
    size: z.string().optional(),
  });

  const { city, age, energy, independence, size } = searchPetsQuerySchema.parse(
    request.query
  );
  try {
    const searchPetsUseCase = makeSearchPetsUseCase();

    const { pets } = await searchPetsUseCase.execute({
      city,
      caracteristics: { age, energy, independence, size },
    });
    return reply.status(200).send({ pets });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message });
    }
  }
}
