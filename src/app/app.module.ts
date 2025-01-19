import { OrganizationModule } from '@/modules/orgs/infra/http/organization.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'
import { EnvModule } from './env/env.module'
import { AuthModule } from './auth/auth.module'
import { PetsModule } from '@/modules/pets/infra/http/pets.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    OrganizationModule,
    PetsModule,
    EnvModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
