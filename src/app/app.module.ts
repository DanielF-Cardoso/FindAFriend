import { OrganizationModule } from '@/modules/orgs/infra/http/organization.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [OrganizationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
