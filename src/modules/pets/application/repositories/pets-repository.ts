import { Pets } from '../../domain/entities/pets'

export interface FindAllPetsParams {
  city: string
  size?: string
  age?: string
  energy_level?: string
  environment?: string
}

export abstract class PetsRepository {
  abstract create(pet: Pets): Promise<void>
  abstract findById(id: string): Promise<Pets | null>
  abstract findAll(params: FindAllPetsParams): Promise<Pets[]>
}
