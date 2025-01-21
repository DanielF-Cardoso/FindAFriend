import { Either, right } from '@/core/either'
import { Pets } from '../domain/entities/pets'
import { PetsRepository } from './repositories/pets-repository'
import { Injectable } from '@nestjs/common'

interface SearchPetsRequest {
  city: string
  size?: string
  age?: string
  energy_level?: string
  environment?: string
  page: number
}

type SearchPetsResponse = Either<
  null,
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
    page,
  }: SearchPetsRequest): Promise<SearchPetsResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      size,
      age,
      energy_level,
      environment,
      page,
    })

    return right({
      pets,
    })
  }
}
