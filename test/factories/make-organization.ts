import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Organization } from '@/modules/orgs/domain/entities/org'
import { faker } from '@faker-js/faker'

export function makeOrganization(
  overrides: Partial<Organization> = {},
  id?: UniqueEntityID,
) {
  const createOrganization = Organization.create(
    {
      name: faker.company.name(),
      ownerName: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      cep: faker.location.zipCode(),
      street: faker.location.street(),
      number: faker.location.buildingNumber(),
      neighborhood: faker.location.country(),
      city: faker.location.city(),
      state: faker.location.state(),
      longitude: faker.location.longitude().toString(),
      latitude: faker.location.latitude().toString(),
      ...overrides,
    },
    id,
  )

  return createOrganization
}
