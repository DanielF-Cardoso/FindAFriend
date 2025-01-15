import {
  FindAllPetsParams,
  PetsRepository,
} from '@/modules/pets/application/repositories/pets-repository'
import { Pets } from '@/modules/pets/domain/entities/pets'
import { InMemoryOrganizationRepository } from './in-memory-org-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public item: Pets[] = []

  constructor(
    private inMemoryOrganizationRepository: InMemoryOrganizationRepository,
  ) {}

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

  async findAll(params: FindAllPetsParams): Promise<Pets[]> {
    const filterOrgsByCity = this.inMemoryOrganizationRepository.item.filter(
      (org) => org.city === params.city,
    )

    const pets = this.item
      .filter((item) =>
        filterOrgsByCity.some(
          (org) => org.id.toString() === item.organization_id.toString(),
        ),
      )
      .filter((item) => (params.age ? item.age === Number(params.age) : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) =>
        params.energy_level ? item.energy_level === params.energy_level : true,
      )
      .filter((item) =>
        params.environment ? item.environment === params.environment : true,
      )

    return pets
  }
}
