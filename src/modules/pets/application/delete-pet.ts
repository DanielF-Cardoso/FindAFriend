import { Either, left, right } from '@/core/either'
import { OrganizationRepository } from '@/modules/orgs/application/repositories/org-repository'
import { PetsRepository } from './repositories/pets-repository'
import { Injectable } from '@nestjs/common'
import { PetNotFoundError } from './errors/pet-not-found-error'
import { DeletePetDto } from '../dtos/delete-pet'
import { NotAllowedError } from './errors/not-allowed-error'

type DeletePetResponse = Either<
  NotAllowedError | PetNotFoundError,
  Record<string, never>
>

@Injectable()
export class DeletePetUseCase {
  constructor(
    private orgRepository: OrganizationRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    id,
    organization_id,
  }: DeletePetDto & {
    organization_id: string
  }): Promise<DeletePetResponse> {
    const findOrganizationById =
      await this.orgRepository.findById(organization_id)

    if (!findOrganizationById) {
      return left(new NotAllowedError())
    }

    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      return left(new PetNotFoundError())
    }

    if (pet.organization_id !== organization_id) {
      return left(new NotAllowedError())
    }

    await this.petsRepository.delete(pet)

    return right({})
  }
}
