import { Module } from '@nestjs/common'
import { RegisterOrganizationController } from './controllers/register-org.controller'
import { RegisterOrganizationUseCase } from '../../application/use-cases/register-org'
import { OrganizationsDatabaseModule } from '../database/prisma/orgs-database.module'
import { CryptographyModule } from '@/app/cryptography/cryptography.module'

@Module({
  imports: [OrganizationsDatabaseModule, CryptographyModule],
  controllers: [RegisterOrganizationController],
  providers: [RegisterOrganizationUseCase],
})
export class OrganizationModule {}
