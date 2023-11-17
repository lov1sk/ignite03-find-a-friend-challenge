import { Pet } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { IPetRepository, caracteristic } from "../pet-repository";
import { randomUUID } from "crypto";
import { InMemoryOngRepository } from "./in-memory-ong-repository";
import { checkCaracteristics } from "@/utils/test/check-caracteristics";

export class InMemoryPetRepository implements IPetRepository {
  public pets: Pet[] = [];
  async create({
    name,
    about,
    age,
    energy,
    independence,
    size,
    ong_id,
  }: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name,
      about,
      age,
      energy,
      independence,
      size,
      ong_id,
      created_at: new Date(),
    };
    this.pets.push(pet);

    return pet;
  }
  async findPetById(petId: string) {
    const pet = this.pets.find((pet) => pet.id === petId);

    if (!pet) {
      return null;
    }

    return pet;
  }
  async searchPetsByQuery(
    city: string,
    caracteristics: caracteristic,
    ongInstance?: InMemoryOngRepository
  ) {
    if (!ongInstance) {
      return [];
    }
    const ongs = await ongInstance.findManyByCity(city);
    const petsOnSameCity = this.pets.filter((pet) => {
      return ongs.find((ong) => ong.id === pet.ong_id);
    });

    const petsFilteredByHisCaracteristics = petsOnSameCity.filter((pet) => {
      return checkCaracteristics(pet, caracteristics);
    });

    return petsFilteredByHisCaracteristics;
  }
  async findManyByCity(city: string, ongInstance?: InMemoryOngRepository) {
    if (!ongInstance) {
      return [];
    }
    const ongs = await ongInstance.findManyByCity(city);

    const petsFiltered = this.pets.filter((pet) => {
      return ongs.find((ong) => ong.id === pet.ong_id);
    });

    return petsFiltered;
  }
  async deleteById(petId: string) {
    const petIndex = this.pets.findIndex((pet) => pet.id === petId);
    this.pets.splice(petIndex, 1);
  }
}
