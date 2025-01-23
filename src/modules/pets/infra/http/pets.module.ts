import { Module } from '@nestjs/common'
import { RegisterPetsUseCase } from '../../application/register-pet'
import { RegisterPetController } from './controller/register-pet.controller'
import { PetsDatabaseModule } from '../database/prisma/pets-database.module'
import { OrganizationsDatabaseModule } from '@/modules/orgs/infra/database/prisma/orgs-database.module'
import { GetPetController } from './controller/get-pet.controller'
import { GetPetUseCase } from '../../application/get-pet'
import { SearchPetsUseCase } from '../../application/search-pets'
import { SearchPetsController } from './controller/search-pets.controller'
import { DeletePetController } from './controller/delete-pet.controller'
import { DeletePetUseCase } from '../../application/delete-pet'

@Module({
  imports: [PetsDatabaseModule, OrganizationsDatabaseModule],
  controllers: [
    RegisterPetController,
    GetPetController,
    SearchPetsController,
    DeletePetController,
  ],
  providers: [
    RegisterPetsUseCase,
    GetPetUseCase,
    SearchPetsUseCase,
    DeletePetUseCase,
  ],
})
export class PetsModule {}
