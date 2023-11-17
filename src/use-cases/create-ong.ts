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
    const ongAlreadyExists = await this.ongRepository.findOngByEmail(email);

    if (ongAlreadyExists) {
      throw new OngAlreadyExistsError();
    }

    const password_hash = await hash(password, 6);

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
