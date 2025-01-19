import { PrismaService } from '@/app/database/prisma.service'
import { PetsRepository } from '@/modules/pets/application/repositories/pets-repository'
import { Module } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PrismaPetsRepository } from './prisma-pets.repository'
import { OrganizationsDatabaseModule } from '@/modules/orgs/infra/database/prisma/orgs-database.module'

@Module({
  imports: [OrganizationsDatabaseModule],
  providers: [
    PrismaClient,
    PrismaService,
    {
      provide: PetsRepository,
      useClass: PrismaPetsRepository,
    },
  ],
  exports: [PrismaService, PetsRepository],
})
export class PetsDatabaseModule {}
