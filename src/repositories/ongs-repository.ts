import { Prisma } from "@prisma/client";
import { Ong } from "@prisma/client";

export interface IOngRepository {
  create({
    name,
    email,
    city,
    address,
    zipcode,
    whatsapp,
    password_hash,
  }: Prisma.OngCreateInput): Promise<Ong>;
  findOngById(id: string): Promise<Ong | null>;
  findOngByEmail(email: string): Promise<Ong | null>;
  findManyByCity(city: string): Promise<Ong[]>;
}
