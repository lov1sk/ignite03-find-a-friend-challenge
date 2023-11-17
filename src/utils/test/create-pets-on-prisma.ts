import { prisma } from "@/lib/prisma";
import { Ong, Pet } from "@prisma/client";
import { hash } from "bcryptjs";

type createPetsOnPrismaRequest = {
  petsQuantity: number;
};

type createPetsOnPrismaResponse = {
  pets: Pet[];
  ong: Ong;
};

export async function createPetsOnPrisma({
  petsQuantity = 1,
}: createPetsOnPrismaRequest): Promise<createPetsOnPrismaResponse> {
  /**
   * Criação de ongs
   */
  const ong = await prisma.ong.create({
    data: {
      name: "ong test",
      city: "São Paulo",
      address: "Rua teste",
      zipcode: "05886010",
      email: "test@example.com",
      password_hash: await hash("34791034", 6),
      whatsapp: "11 951759923",
    },
  });
  /**
   * Criação de pets
   */
  for (let i = 0; i < petsQuantity; i++) {
    await prisma.pet.create({
      data: {
        name: "Pet 01",
        about: "A new Pet",
        age: "Child",
        energy: "Low",
        size: "Small",
        independence: "Low",
        ong_id: ong.id,
      },
    });
  }

  const pets = await prisma.pet.findMany({
    where: {
      ong_id: ong.id,
    },
  });

  return {
    pets,
    ong,
  };
}
