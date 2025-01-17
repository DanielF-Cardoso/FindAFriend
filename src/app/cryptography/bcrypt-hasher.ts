import { HasherComparer } from '@/modules/orgs/cryptography/hash-comparer'
import { HasherGenerator } from '@/modules/orgs/cryptography/hash-generator'
import { compare, hash } from 'bcryptjs'

export class BcryptHasher implements HasherGenerator, HasherComparer {
  async compare(plain: string, hashed: string): Promise<boolean> {
    return compare(plain, hashed)
  }

  async hash(plain: string): Promise<string> {
    return hash(plain, 8)
  }
}
