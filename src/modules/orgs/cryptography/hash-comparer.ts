export abstract class HasherComparer {
  abstract compare(plain: string, hashed: string): Promise<boolean>
}
