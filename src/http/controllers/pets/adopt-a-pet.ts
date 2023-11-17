// Vai ter que achar um pet pelo id
// vai ter que achar a ong
// devolver a ong com o nome, endereço, zipcode e whatsapp

import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeAdoptPetUseCase } from "@/use-cases/factories/make-adopt-pet-use-case";
import { makeFetchPetDetailsUseCase } from "@/use-cases/factories/make-fetch-pet-details-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function adoptAPet(request: FastifyRequest, reply: FastifyReply) {
  const adoptAPetParamsSchema = z.object({
    petId: z.string(),
  });

  const { petId } = adoptAPetParamsSchema.parse(request.params);

  try {
    const adoptPetUseCase = makeAdoptPetUseCase();

    const { pet, ong } = await adoptPetUseCase.execute({
      petId,
    });
    return reply.status(200).send({
      pet: {
        name: pet.name,
        about: pet.about,
        age: pet.age,
        size: pet.size,
        energy: pet.energy,
        independence: pet.independence,
      },
      ong: {
        name: ong.name,
        address: ong.address,
        zipcode: ong.zipcode,
        whatsapp: ong.whatsapp,
      },
    });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message });
    }
  }
}
