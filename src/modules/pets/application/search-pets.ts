import { Either, right, left } from '@/core/either'
import { Pets } from '../domain/entities/pets'
import { PetsRepository } from './repositories/pets-repository'
import { Injectable } from '@nestjs/common'
import { SearchPetsDto } from '../dtos/search-pet.dto'
import { PetNotFoundError } from './errors/pet-not-found-error'
import { OrganizationRepository } from '@/modules/orgs/application/repositories/org-repository'
import { Organization } from '@/modules/orgs/domain/entities/org'

type SearchPetsResponse = Either<
  PetNotFoundError,
  {
    pets: Pets[]
    organizations: Organization[]
  }
>

@Injectable()
export class SearchPetsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationRepository: OrganizationRepository,
  ) {}

  async execute({
    city,
    size,
    age,
    energy_level,
    environment,
    page = 1,
  }: SearchPetsDto): Promise<SearchPetsResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      size,
      age,
      energy_level,
      environment,
      page,
    })

    if (!pets.length) {
      return left(new PetNotFoundError())
    }

    const organizations = await Promise.all(
      pets.map((pet) =>
        this.organizationRepository.findById(pet.organization_id),
      ),
    )

    return right({
      pets,
      organizations: organizations.filter(
        (org): org is Organization => org !== null,
      ),
    })
  }
}
