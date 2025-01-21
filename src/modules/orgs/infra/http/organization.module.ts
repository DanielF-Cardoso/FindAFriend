import { Module } from '@nestjs/common'
import { RegisterOrganizationController } from './controllers/register-org.controller'
import { RegisterOrganizationUseCase } from '../../application/use-cases/register-org'
import { OrganizationsDatabaseModule } from '../database/prisma/orgs-database.module'
import { CryptographyModule } from '@/app/cryptography/cryptography.module'
import { AuthenticateOrganizationController } from './controllers/authenticate-org.controller'
import { AuthenticateOrganizationUseCase } from '../../application/use-cases/authenticate-org'
import { FetchNearbyOrganizationsController } from './controllers/fetch-nearby-orgs.controller'
import { FetchNearbyOrganizationUseCase } from '../../application/use-cases/fetch-nearby-orgs'

@Module({
  imports: [OrganizationsDatabaseModule, CryptographyModule],
  controllers: [
    RegisterOrganizationController,
    AuthenticateOrganizationController,
    FetchNearbyOrganizationsController,
  ],
  providers: [
    RegisterOrganizationUseCase,
    AuthenticateOrganizationUseCase,
    FetchNearbyOrganizationUseCase,
  ],
})
export class OrganizationModule {}
