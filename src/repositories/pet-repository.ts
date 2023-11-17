import { Prisma, Pet, Ong } from "@prisma/client";
import { InMemoryOngRepository } from "./in-memory/in-memory-ong-repository";

export type caracteristic = {
  age?: string;
  energy?: string;
  size?: string;
  independence?: string;
};

export interface IPetRepository {
  create({
    name,
    about,
    age,
    energy,
    independence,
    size,
    ong_id,
  }: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findPetById(petId: string): Promise<Pet | null>;
  searchPetsByQuery(
    city: string,
    caracteristics: caracteristic,
    ongInstance?: InMemoryOngRepository
  ): Promise<Pet[]>;
  findManyByCity(
    city: string,
    ongInstance?: InMemoryOngRepository
  ): Promise<Pet[]>;
  deleteById(petId: string): Promise<void>;
}
