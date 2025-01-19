import {
  FindManyNearbyParams,
  OrganizationRepository,
} from '@/modules/orgs/application/repositories/org-repository'
import { Organization } from '@/modules/orgs/domain/entities/org'
import { PrismaOrganizationsMapper } from '../mappers/prisma-orgs-mapper'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/app/database/prisma.service'

@Injectable()
export class PrismaOrganizationRepository implements OrganizationRepository {
  constructor(private prisma: PrismaService) { }

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

  findManyNearby(params: FindManyNearbyParams): Promise<Organization[]> {
    throw new Error('Method not implemented.')
  }
}
