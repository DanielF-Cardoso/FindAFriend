import { Module } from '@nestjs/common'
import { RegisterPetsUseCase } from '../../application/register-pet'
import { RegisterPetController } from './controller/register-pet.controller'
import { PetsDatabaseModule } from '../database/prisma/pets-database.module'
import { OrganizationsDatabaseModule } from '@/modules/orgs/infra/database/prisma/orgs-database.module'
import { GetPetController } from './controller/get-pet.controller'
import { GetPetUseCase } from '../../application/get-pet'

@Module({
  imports: [PetsDatabaseModule, OrganizationsDatabaseModule],
  controllers: [RegisterPetController, GetPetController],
  providers: [RegisterPetsUseCase, GetPetUseCase],
})
export class PetsModule {}
