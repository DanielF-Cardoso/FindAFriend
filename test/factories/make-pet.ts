import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Pets } from '@/modules/pets/domain/entities/pets'
import { faker } from '@faker-js/faker'

export function makePet(overrides: Partial<Pets> = {}, id?: UniqueEntityID) {
  const createPet = Pets.create(
    {
      petName: faker.animal.cat(),
      about: faker.lorem.paragraph(),
      age: faker.number.int(),
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
