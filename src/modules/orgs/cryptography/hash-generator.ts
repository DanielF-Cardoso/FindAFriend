export abstract class HasherGenerator {
  abstract hash(plain: string): Promise<string>
}
