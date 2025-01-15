import { Either, right } from '@/core/either'
import { Pets } from '../domain/entities/pets'
import { PetsRepository } from './repositories/pets-repository'

interface SearchPetsRequest {
  city: string
  size?: string
  age?: string
  energy_level?: string
  environment?: string
}

type SearchPetsResponse = Either<
  null,
  {
    pets: Pets[]
  }
>

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    size,
    age,
    energy_level,
    environment,
  }: SearchPetsRequest): Promise<SearchPetsResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      size,
      age,
      energy_level,
      environment,
    })

    return right({
      pets,
    })
  }
}
