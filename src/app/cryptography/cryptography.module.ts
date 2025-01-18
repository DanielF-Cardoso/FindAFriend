import { HasherComparer } from '@/modules/orgs/cryptography/hash-comparer'
import { Module } from '@nestjs/common'
import { BcryptHasher } from './bcrypt-hasher'
import { HasherGenerator } from '@/modules/orgs/cryptography/hash-generator'
import { Encrypter } from '@/modules/orgs/cryptography/encrypter'
import { JwtEncrypter } from './jwt-encrypter'

@Module({
  providers: [
    { provide: HasherComparer, useClass: BcryptHasher },
    { provide: HasherGenerator, useClass: BcryptHasher },
    { provide: Encrypter, useClass: JwtEncrypter },
  ],
  exports: [HasherComparer, HasherGenerator, Encrypter],
})
export class CryptographyModule {}
