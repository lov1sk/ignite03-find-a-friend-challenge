import { Pet } from "@prisma/client";

export function checkCaracteristics(
  pet: Pet,
  caracteristics: {
    age?: string;
    energy?: string;
    size?: string;
    independence?: string;
  }
) {
  return (
    (pet.age === caracteristics.age &&
      pet.energy === caracteristics.energy &&
      pet.size === caracteristics.size &&
      pet.independence === caracteristics.independence) ||
    (pet.age === caracteristics.age &&
      pet.energy === caracteristics.energy &&
      pet.size === caracteristics.size) ||
    (pet.energy === caracteristics.energy &&
      pet.size === caracteristics.size &&
      pet.independence === caracteristics.independence) ||
    (pet.size === caracteristics.size &&
      pet.energy === caracteristics.energy &&
      pet.age === caracteristics.age) ||
    (pet.age === caracteristics.age &&
      pet.independence === caracteristics.independence &&
      pet.energy === caracteristics.energy) ||
    (pet.age === caracteristics.age &&
      pet.independence === caracteristics.independence) ||
    (pet.age === caracteristics.age && pet.energy === caracteristics.energy) ||
    (pet.age === caracteristics.age && pet.size === caracteristics.size) ||
    (pet.size === caracteristics.size &&
      pet.energy === caracteristics.energy) ||
    (pet.size === caracteristics.size &&
      pet.independence === caracteristics.independence) ||
    (pet.independence === caracteristics.independence &&
      pet.energy === caracteristics.energy) ||
    pet.age === caracteristics.age ||
    pet.energy === caracteristics.energy ||
    pet.size === caracteristics.size ||
    pet.independence === caracteristics.independence
  );
}
