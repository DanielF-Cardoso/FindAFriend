import { OrganizationRepository } from '@/modules/orgs/application/repositories/org-repository'
import { Organization } from '@/modules/orgs/domain/entities/org'
import { PrismaOrganizationsMapper } from '../mappers/prisma-orgs-mapper'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/app/database/prisma.service'
import { FetchNearbyOrganizationDto } from '@/modules/orgs/dtos/fetch-nearby-organization.dto'

@Injectable()
export class PrismaOrganizationRepository implements OrganizationRepository {
  constructor(private prisma: PrismaService) {}

  async create(org: Organization): Promise<void> {
    const data = PrismaOrganizationsMapper.toPersistence(org)
    await this.prisma.organization.create({ data })
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: { email },
    })

    if (!organization) {
      return null
    }

    return PrismaOrganizationsMapper.toDomain(organization)
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: { id },
    })

    if (!organization) {
      return null
    }

    return PrismaOrganizationsMapper.toDomain(organization)
  }

  async findManyNearby(
    params: FetchNearbyOrganizationDto,
  ): Promise<Organization[]> {
    const { userLatitude, userLongitude } = params

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const organizations = await this.prisma.$queryRaw<any[]>`
      SELECT * FROM organizations
      WHERE (
        6371 * acos(
          cos(radians(CAST(${userLatitude} AS DOUBLE PRECISION))) * cos(radians(latitude)) * cos(radians(longitude) - radians(CAST(${userLongitude} AS DOUBLE PRECISION))) +
          sin(radians(CAST(${userLatitude} AS DOUBLE PRECISION))) * sin(radians(latitude))
        )
      ) <= 10
    `

    return organizations.map((org) => PrismaOrganizationsMapper.toDomain(org))
  }
}
