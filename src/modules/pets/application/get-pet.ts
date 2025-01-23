import { Either, left, right } from '@/core/either'
import { PetNotFoundError } from './errors/pet-not-found-error'
import { Pets } from '../domain/entities/pets'
import { PetsRepository } from './repositories/pets-repository'
import { Injectable } from '@nestjs/common'
import { GetPetDto } from '../dtos/get-pet.dto'
import { OrganizationRepository } from '@/modules/orgs/application/repositories/org-repository'
import { OrganizationNotFoundError } from '@/modules/orgs/application/use-cases/errors/organization-not-found-error'
import { Organization } from '@/modules/orgs/domain/entities/org'

type GetPetResponse = Either<
  PetNotFoundError | OrganizationNotFoundError,
  {
    pet: Pets
    organization: Organization
  }
>

@Injectable()
export class GetPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationRepository: OrganizationRepository,
  ) {}

  async execute({ id }: GetPetDto): Promise<GetPetResponse> {
    const findPetById = await this.petsRepository.findById(id)

    if (!findPetById) {
      return left(new PetNotFoundError())
    }

    const findOrganizationById = await this.organizationRepository.findById(
      findPetById.organization_id,
    )

    if (!findOrganizationById) {
      return left(new OrganizationNotFoundError())
    }

    return right({
      pet: findPetById,
      organization: findOrganizationById,
    })
  }
}
