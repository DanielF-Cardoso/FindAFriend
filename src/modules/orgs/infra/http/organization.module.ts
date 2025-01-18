import { Module } from '@nestjs/common'
import { RegisterOrganizationController } from './controllers/register-org.controller'
import { RegisterOrganizationUseCase } from '../../application/use-cases/register-org'
import { OrganizationsDatabaseModule } from '../database/prisma/orgs-database.module'
import { CryptographyModule } from '@/app/cryptography/cryptography.module'
import { AuthenticateOrganizationController } from './controllers/authenticate-org.controller'
import { AuthenticateOrganizationUseCase } from '../../application/use-cases/authenticate-org'

@Module({
  imports: [OrganizationsDatabaseModule, CryptographyModule],
  controllers: [
    RegisterOrganizationController,
    AuthenticateOrganizationController,
  ],
  providers: [RegisterOrganizationUseCase, AuthenticateOrganizationUseCase],
})
export class OrganizationModule {}
