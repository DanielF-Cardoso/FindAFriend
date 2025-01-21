import { ZodValidationPipe } from '@/app/pipes/zod-validation.pipe'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { SearchPetsUseCase } from '@/modules/pets/application/search-pets'
import { Public } from '@/app/auth/public'
import { PetPresenter } from '../presenters/pet.presenter'

const querySchema = z.object({
  city: z.string().min(1),
  age: z.string().optional(),
  size: z.string().optional(),
  energy_level: z.string().optional(),
  environment: z.string().optional(),
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().min(1)),
})

const queryValidationPipe = new ZodValidationPipe(querySchema)

type QuerySchema = z.infer<typeof querySchema>

@Controller('/pets')
export class SearchPetsController {
  constructor(private searchPetsUseCase: SearchPetsUseCase) {}

  @Get()
  @Public()
  async handle(@Query(queryValidationPipe) query: QuerySchema) {
    const { city, age, size, energy_level, environment, page } = query

    const searchPet = await this.searchPetsUseCase.execute({
      city,
      age,
      size,
      energy_level,
      environment,
      page,
    })

    if (searchPet.isLeft()) {
      throw new BadRequestException()
    }

    return { pets: searchPet.value.pets.map(PetPresenter.toHTTP) }
  }
}
