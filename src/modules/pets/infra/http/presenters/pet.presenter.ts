import { Pets } from '@/modules/pets/domain/entities/pets'

export class PetPresenter {
  static toHTTP(pets: Pets) {
    return {
      id: pets.id.toString(),
      petName: pets.petName,
      about: pets.about,
      age: pets.age,
      size: pets.size,
      energy_level: pets.energy_level,
      environment: pets.environment,
      createdAt: pets.createdAt,
    }
  }
}
