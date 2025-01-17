import { HasherComparer } from '@/modules/orgs/cryptography/hash-comparer'
import { Module } from '@nestjs/common'
import { BcryptHasher } from './bcrypt-hasher'
import { HasherGenerator } from '@/modules/orgs/cryptography/hash-generator'

@Module({
  providers: [
    { provide: HasherComparer, useClass: BcryptHasher },
    { provide: HasherGenerator, useClass: BcryptHasher },
  ],
  exports: [HasherComparer, HasherGenerator],
})
export class CryptographyModule {}
