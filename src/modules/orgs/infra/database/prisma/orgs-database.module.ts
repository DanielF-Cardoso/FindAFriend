import { PrismaService } from '@/app/database/prisma.service'
import { OrganizationRepository } from '@/modules/orgs/application/repositories/org-repository'
import { Module } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PrismaOrganizationRepository } from './prisma-orgs.repository'

@Module({
  imports: [],
  providers: [
    PrismaClient,
    PrismaService,
    {
      provide: OrganizationRepository,
      useClass: PrismaOrganizationRepository,
    },
  ],
  exports: [PrismaService, OrganizationRepository],
})
export class OrganizationsDatabaseModule { }
