import { Pets } from '../../domain/entities/pets'

export interface FindAllPetsParams {
  city: string
  size?: string
  age?: string
  energy_level?: string
  environment?: string
  page: number
}

export abstract class PetsRepository {
  abstract create(pet: Pets): Promise<void>
  abstract findById(id: string): Promise<Pets | null>
  abstract findAll(params: FindAllPetsParams): Promise<Pets[]>
  abstract save(pet: Pets): Promise<void>
  abstract delete(pet: Pets): Promise<void>
}
