import { PrismaService } from '@/app/database/prisma.service'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Pets, PetsProps } from '@/modules/pets/domain/entities/pets'
import { PrismaPetsMapper } from '@/modules/pets/infra/database/mappers/prisma-pets.mapper'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makePet(
  overrides: Partial<PetsProps> = {},
  id?: UniqueEntityID,
) {
  const createPet = Pets.create(
    {
      petName: faker.animal.cat(),
      about: faker.lorem.paragraph(),
      age: faker.number.int().toString(),
      size: faker.helpers.arrayElement(['small', 'medium', 'large']),
      energy_level: faker.helpers.arrayElement(['low', 'medium', 'high']),
      environment: faker.helpers.arrayElement(['indoor', 'outdoor']),
      organization_id: faker.string.uuid(),
      ...overrides,
    },
    id,
  )

  return createPet
}

@Injectable()
export class PetFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPet(data: Partial<PetsProps> = {}): Promise<Pets> {
    const createPet = makePet(data)

    await this.prisma.pet.create({
      data: PrismaPetsMapper.toPersistence(createPet),
    })

    return createPet
  }
}
