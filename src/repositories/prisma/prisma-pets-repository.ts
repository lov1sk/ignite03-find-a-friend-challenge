import { Pet, Prisma } from "@prisma/client";
import { IPetRepository } from "../pet-repository";
import { prisma } from "@/lib/prisma";
import { InMemoryOngRepository } from "../in-memory/in-memory-ong-repository";
import type { caracteristic } from "../pet-repository";

export class PrismaPetsRepository implements IPetRepository {
  async create({
    name,
    about,
    age,
    energy,
    independence,
    size,
    ong_id,
  }: Prisma.PetUncheckedCreateInput) {
    const pet = prisma.pet.create({
      data: {
        name,
        about,
        age,
        energy,
        independence,
        size,
        ong_id,
      },
    });

    return pet;
  }
  async deleteById(petId: string) {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  }
  async findManyByCity(city: string, ongInstance?: InMemoryOngRepository) {
    const pets = await prisma.pet.findMany({
      where: {
        ongs: {
          city,
        },
      },
    });
    return pets;
  }
  async findPetById(petId: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
      include: {
        ongs: true,
      },
    });
    return pet;
  }
  async searchPetsByQuery(
    city: string,
    caracteristic: caracteristic,
    ongInstance?: InMemoryOngRepository
  ) {
    const pets: Pet[] = await prisma.$queryRaw`
    SELECT * FROM pets
    INNER JOIN ongs ON pets.ong_id = ongs.id
    WHERE ${city} LIKE ongs.city AND
    (${caracteristic.age} LIKE pets.age AND ${caracteristic.energy} LIKE pets.energy AND ${caracteristic.size} LIKE pets.size AND ${caracteristic.independence} LIKE pets.independence) OR
    (${caracteristic.age} LIKE pets.age AND ${caracteristic.energy} LIKE pets.energy AND ${caracteristic.size} LIKE pets.size) OR
    (${caracteristic.energy} LIKE pets.energy AND ${caracteristic.size} LIKE pets.size AND ${caracteristic.independence} LIKE pets.independence) OR
    (${caracteristic.size} LIKE pets.size AND ${caracteristic.independence} LIKE pets.independence AND ${caracteristic.age} LIKE pets.age) OR
    (${caracteristic.age} LIKE pets.age AND ${caracteristic.independence} LIKE pets.independence AND ${caracteristic.energy} LIKE pets.energy) OR
    (${caracteristic.age} LIKE pets.age AND ${caracteristic.independence} LIKE pets.independence) OR
    (${caracteristic.age} LIKE pets.age AND ${caracteristic.energy} LIKE pets.energy) OR
    (${caracteristic.age} LIKE pets.age AND ${caracteristic.size} LIKE pets.size) OR
    (${caracteristic.size} LIKE pets.size AND ${caracteristic.energy} LIKE pets.energy) OR
    (${caracteristic.size} LIKE pets.size AND ${caracteristic.independence} LIKE pets.independence) OR
    (${caracteristic.independence} LIKE pets.independence AND ${caracteristic.energy} LIKE pets.energy) OR
    ${caracteristic.age} LIKE pets.age OR ${caracteristic.energy} LIKE pets.energy  OR ${caracteristic.size} LIKE pets.size OR ${caracteristic.independence} LIKE pets.independence
    `;

    console.log(pets);

    return pets;
  }
}
/**
 *
    
 */
