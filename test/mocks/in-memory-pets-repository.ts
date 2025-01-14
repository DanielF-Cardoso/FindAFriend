import { PetsRepository } from '@/modules/pets/application/repositories/pets-repository'
import { Pets } from '@/modules/pets/domain/entities/pets'

export class InMemoryPetsRepository implements PetsRepository {
  public item: Pets[] = []

  async create(pet: Pets) {
    this.item.push(pet)
  }

  async findById(id: string) {
    const pet = this.item.find((item) => item.id.toString() === id)

    if (!pet) {
      return null
    }

    return pet
  }
}
