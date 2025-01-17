import { OrganizationModule } from '@/modules/orgs/infra/http/organization.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'
import { EnvModule } from './env/env.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    OrganizationModule,
    EnvModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
