import { Either, left, right } from '@/core/either'
import { PetNotFoundError } from './errors/pet-not-found-error'
import { Pets } from '../domain/entities/pets'
import { PetsRepository } from './repositories/pets-repository'

interface GetPetRequest {
  id: string
}

type GetPetResponse = Either<
  PetNotFoundError,
  {
    pet: Pets
  }
>

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetRequest): Promise<GetPetResponse> {
    const findPetById = await this.petsRepository.findById(id)

    if (!findPetById) {
      return left(new PetNotFoundError(id))
    }

    return right({
      pet: findPetById,
    })
  }
}
