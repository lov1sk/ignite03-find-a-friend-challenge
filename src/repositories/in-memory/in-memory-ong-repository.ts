import { Ong } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { IOngRepository } from "../ongs-repository";

export class InMemoryOngRepository implements IOngRepository {
  public ongs: Ong[] = [];
  async create({
    name,
    city,
    address,
    zipcode,
    email,
    whatsapp,
    password_hash,
  }: Prisma.OngCreateInput) {
    const ong = {
      id: randomUUID(),
      name,
      city,
      address,
      zipcode,
      email,
      whatsapp,
      password_hash,
      created_at: new Date(),
    };
    this.ongs.push(ong);
    return ong;
  }
  async findOngById(id: string) {
    const ong = this.ongs.find((ong) => ong.id === id);

    if (!ong) {
      return null;
    }
    return ong;
  }
  async findOngByEmail(email: string) {
    const ong = this.ongs.find((ong) => ong.email === email);

    if (!ong) {
      return null;
    }

    return ong;
  }
  async findManyByCity(city: string) {
    const ongsFiltered = this.ongs.filter((ong) => ong.city === city);
    return ongsFiltered;
  }
}
