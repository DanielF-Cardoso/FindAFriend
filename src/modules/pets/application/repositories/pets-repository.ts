import { Pets } from '../../domain/entities/pets'

export abstract class PetsRepository {
  abstract create(pet: Pets): Promise<void>
  abstract findById(id: string): Promise<Pets | null>
}
