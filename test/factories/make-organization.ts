import { PrismaService } from '@/app/database/prisma.service'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Organization,
  OrganizationProps,
} from '@/modules/orgs/domain/entities/org'
import { PrismaOrganizationsMapper } from '@/modules/orgs/infra/database/mappers/prisma-orgs-mapper'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

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
      longitude: faker.location.longitude(),
      latitude: faker.location.latitude(),
      ...overrides,
    },
    id,
  )

  return createOrganization
}

@Injectable()
export class OrganizationFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaOrganization(
    data: Partial<OrganizationProps> = {},
  ): Promise<Organization> {
    const organization = makeOrganization(data)

    await this.prisma.organization.create({
      data: PrismaOrganizationsMapper.toPersistence(organization),
    })

    return organization
  }
}
