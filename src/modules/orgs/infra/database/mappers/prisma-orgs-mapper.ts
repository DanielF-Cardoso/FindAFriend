import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Organization } from '@/modules/orgs/domain/entities/org'
import { Organization as PrismaOrganization, Prisma } from '@prisma/client'

export class PrismaOrganizationsMapper {
  static toDomain(raw: PrismaOrganization): Organization {
    return Organization.create({
      name: raw.name,
      ownerName: raw.ownerName,
      email: raw.email,
      password: raw.password,
      phone: raw.phone,
      cep: raw.cep,
      street: raw.street,
      number: raw.number,
      neighborhood: raw.neighborhood,
      city: raw.city,
      state: raw.state,
      latitude: raw.latitude.toNumber(),
      longitude: raw.longitude.toNumber(),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    },
      new UniqueEntityID(raw.id)
    )
  }

  static toPersistence(
    org: Organization,
  ): Prisma.OrganizationUncheckedCreateInput {
    return {
      id: org.id.toString(),
      name: org.name,
      ownerName: org.ownerName,
      email: org.email,
      password: org.password,
      phone: org.phone,
      cep: org.cep,
      street: org.street,
      number: org.number,
      neighborhood: org.neighborhood,
      city: org.city,
      state: org.state,
      latitude: org.latitude,
      longitude: org.longitude,
      createdAt: org.createdAt,
      updatedAt: org.updatedAt,
    }
  }
}
