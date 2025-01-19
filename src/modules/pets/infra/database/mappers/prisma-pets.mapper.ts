import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Pets } from '@/modules/pets/domain/entities/pets'
import { Pet as PrismaPets, Prisma } from '@prisma/client'

export class PrismaPetsMapper {
  static toDomain(raw: PrismaPets): Pets {
    return Pets.create(
      {
        petName: raw.petName,
        about: raw.about,
        age: raw.age,
        size: raw.size,
        energy_level: raw.energy_level,
        environment: raw.environment,
        organization_id: raw.organization_id,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPersistence(pets: Pets): Prisma.PetUncheckedCreateInput {
    return {
      id: pets.id.toString(),
      petName: pets.petName,
      about: pets.about,
      age: pets.age,
      size: pets.size,
      energy_level: pets.energy_level,
      environment: pets.environment,
      organization_id: pets.organization_id,
    }
  }
}
