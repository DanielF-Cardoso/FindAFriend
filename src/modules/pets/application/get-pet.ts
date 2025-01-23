import { Either, left, right } from '@/core/either'
import { PetNotFoundError } from './errors/pet-not-found-error'
import { Pets } from '../domain/entities/pets'
import { PetsRepository } from './repositories/pets-repository'
import { Injectable } from '@nestjs/common'
import { GetPetDto } from '../dtos/get-pet.dto'

type GetPetResponse = Either<
  PetNotFoundError,
  {
    pet: Pets
  }
>

@Injectable()
export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetDto): Promise<GetPetResponse> {
    const findPetById = await this.petsRepository.findById(id)

    if (!findPetById) {
      return left(new PetNotFoundError())
    }

    return right({
      pet: findPetById,
    })
  }
}
