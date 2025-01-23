import { Either, right, left } from '@/core/either'
import { Pets } from '../domain/entities/pets'
import { PetsRepository } from './repositories/pets-repository'
import { Injectable } from '@nestjs/common'
import { SearchPetsDto } from '../dtos/search-pet.dto'
import { PetNotFoundError } from './errors/pet-not-found-error'

type SearchPetsResponse = Either<
  PetNotFoundError,
  {
    pets: Pets[]
  }
>

@Injectable()
export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

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

    if (!pets) {
      return left(new PetNotFoundError())
    }

    return right({
      pets,
    })
  }
}
