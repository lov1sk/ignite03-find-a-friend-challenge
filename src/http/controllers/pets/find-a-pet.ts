import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFetchPetDetailsUseCase } from "@/use-cases/factories/make-fetch-pet-details-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findAPet(request: FastifyRequest, reply: FastifyReply) {
  const findAPetParamsSchema = z.object({
    petId: z.string(),
  });

  const { petId } = findAPetParamsSchema.parse(request.params);

  try {
    const fetchPetDetailsUseCase = makeFetchPetDetailsUseCase();

    const { pet } = await fetchPetDetailsUseCase.execute({
      petId,
    });
    return reply.status(200).send({ pet });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message });
    }
  }
}
