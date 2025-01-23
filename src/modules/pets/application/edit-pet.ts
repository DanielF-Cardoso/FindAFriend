import { Either, left, right } from '@/core/either'
import { Pets } from '../domain/entities/pets'
import { OrganizationRepository } from '@/modules/orgs/application/repositories/org-repository'
import { PetsRepository } from './repositories/pets-repository'
import { Injectable } from '@nestjs/common'
import { EditPetDto } from '../dtos/edit-pet.dto'
import { NotAllowedError } from './errors/not-allowed-error'
import { PetNotFoundError } from './errors/pet-not-found-error'

type EditPetResponse = Either<
  NotAllowedError | PetNotFoundError,
  {
    pet: Pets
  }
>

@Injectable()
export class EditPetUseCase {
  constructor(
    private orgRepository: OrganizationRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    id,
    petName,
    about,
    age,
    size,
    energy_level,
    environment,
    organization_id,
  }: EditPetDto & {
    id: string
    organization_id: string
  }): Promise<EditPetResponse> {
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

    pet.petName = petName ?? pet.petName
    pet.about = about ?? pet.about
    pet.age = age ?? pet.age
    pet.size = size ?? pet.size
    pet.energy_level = energy_level ?? pet.energy_level
    pet.environment = environment ?? pet.environment

    await this.petsRepository.save(pet)

    return right({
      pet,
    })
  }
}
