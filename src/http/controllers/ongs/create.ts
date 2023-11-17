import { OngAlreadyExistsError } from "@/use-cases/errors/ong-already-exists-error";
import { makeCreateOngUseCase } from "@/use-cases/factories/make-create-ong-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOngRequestSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    city: z.string(),
    zipcode: z.string(),
    address: z.string(),
    password: z.string().min(6),
    whatsapp: z.string(),
  });

  const requestData = createOngRequestSchema.parse(request.body);

  const createOngUseCase = makeCreateOngUseCase();
  try {
    const { ong } = await createOngUseCase.execute(requestData);
    return reply.status(201).send();
  } catch (error) {
    if (error instanceof OngAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }
  }
}
