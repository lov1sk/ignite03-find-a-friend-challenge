import { IOngRepository } from "@/repositories/ongs-repository";
import { Ong } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { compare } from "bcryptjs";
import { InvalidOngPasswordError } from "./errors/invalid-ong-password-error";

interface AuthenticateOngUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateOngUseCaseResponse {
  ong: Ong;
}

export class AuthenticateOngUseCase {
  constructor(private ongRepository: IOngRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateOngUseCaseRequest): Promise<AuthenticateOngUseCaseResponse> {
    /**
     * Realiza a busca para ver se o email passado esta correto
     */
    const ong = await this.ongRepository.findOngByEmail(email);

    if (!ong) {
      throw new ResourceNotFoundError();
    }

    // Verifica se a senha fornecida é igual a senha que foi persistida previamente
    const isSamePassword = await compare(password, ong.password_hash);

    if (!isSamePassword) {
      throw new InvalidOngPasswordError();
    }

    return {
      ong,
    };
  }
}
