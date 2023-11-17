import { Prisma } from "@prisma/client";
import { IOngRepository } from "../ongs-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOngsRepository implements IOngRepository {
  async create({
    name,
    email,
    city,
    address,
    zipcode,
    whatsapp,
    password_hash,
  }: Prisma.OngCreateInput) {
    const ong = await prisma.ong.create({
      data: {
        name,
        email,
        city,
        address,
        zipcode,
        whatsapp,
        password_hash,
      },
    });

    return ong;
  }
  async findOngById(id: string) {
    const ong = await prisma.ong.findUnique({
      where: {
        id,
      },
    });
    return ong;
  }
  async findManyByCity(city: string) {
    const ongs = await prisma.ong.findMany({
      where: {
        city,
      },
    });

    return ongs;
  }
  async findOngByEmail(email: string) {
    const ong = await prisma.ong.findUnique({
      where: {
        email,
      },
    });
    return ong;
  }
}
