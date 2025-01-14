import { Either, left, right } from '@/core/either'
import { OrganizationNotFoundError } from '../../orgs/application/use-cases/errors/organization-not-found-error'
import { Pets } from '../domain/entities/pets'
import { OrganizationRepository } from '@/modules/orgs/application/repositories/org-repository'
import { PetsRepository } from './repositories/pets-repository'

interface RegisterPetsRequest {
  petName: string
  about: string
  age: number
  size: string
  energy_level: string
  environment: string
  organization_id: string
}

type RegisterPetsResponse = Either<
  OrganizationNotFoundError,
  {
    pets: Pets
  }
>

export class RegisterPetsUseCase {
  constructor(
    private orgRepository: OrganizationRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    petName,
    about,
    age,
    size,
    energy_level,
    environment,
    organization_id,
  }: RegisterPetsRequest): Promise<RegisterPetsResponse> {
    const findOrganizationById =
      await this.orgRepository.findById(organization_id)

    if (!findOrganizationById) {
      return left(new OrganizationNotFoundError())
    }

    const petData = Pets.create({
      petName,
      about,
      age,
      size,
      energy_level,
      environment,
      organization_id,
    })

    await this.petsRepository.create(petData)

    return right({
      pets: petData,
    })
  }
}
