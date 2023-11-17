import { IOngRepository } from "@/repositories/ongs-repository";
import { Ong } from "@prisma/client";
import { OngAlreadyExistsError } from "./errors/ong-already-exists-error";
import { hash } from "bcryptjs";

interface CreateOngUseCaseRequest {
  name: string;
  email: string;
  city: string;
  zipcode: string;
  address: string;
  whatsapp: string;
  password: string;
}

interface CreateOngUseCaseResponse {
  ong: Ong;
}

export class CreateOngUseCase {
  constructor(private ongRepository: IOngRepository) {}
  async execute({
    name,
    email,
    city,
    address,
    zipcode,
    password,
    whatsapp,
  }: CreateOngUseCaseRequest): Promise<CreateOngUseCaseResponse> {
    /**
     * Verificação se ja existe uma ong cadastrada com o email passado
     */
    const ongAlreadyExists = await this.ongRepository.findOngByEmail(email);

    if (ongAlreadyExists) {
      throw new OngAlreadyExistsError();
    }

    /**
     * Faz hash da senha para garantir a segurança dos dados
     */
    const password_hash = await hash(password, 6);

    /**
     * Cria e retorna a ong cadastrada
     */
    const ong = await this.ongRepository.create({
      name,
      email,
      city,
      address,
      zipcode,
      password_hash,
      whatsapp,
    });

    return {
      ong,
    };
  }
}
