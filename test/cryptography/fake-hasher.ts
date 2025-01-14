import { HasherComparer } from '@/modules/orgs/cryptography/hash-comparer'
import { HasherGenerator } from '@/modules/orgs/cryptography/hash-generator'

export class FakeHasher implements HasherGenerator, HasherComparer {
  async hash(plain: string): Promise<string> {
    return plain.concat('hashed')
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return plain.concat('hashed') === hashed
  }
}
