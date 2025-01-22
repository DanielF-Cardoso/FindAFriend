import { ZodValidationPipe } from '@/app/pipes/zod-validation.pipe'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { SearchPetsUseCase } from '@/modules/pets/application/search-pets'
import { Public } from '@/app/auth/public'
import { PetPresenter } from '../presenters/pet.presenter'
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'

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

@ApiTags('pets')
@Controller('/pets')
export class SearchPetsController {
  constructor(private searchPetsUseCase: SearchPetsUseCase) {}

  @Get()
  @Public()
  @ApiQuery({ name: 'city', required: true, type: String })
  @ApiQuery({ name: 'age', required: false, type: String })
  @ApiQuery({ name: 'size', required: false, type: String })
  @ApiQuery({ name: 'energy_level', required: false, type: String })
  @ApiQuery({ name: 'environment', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number, default: 1 })
  @ApiResponse({
    status: 200,
    description: 'Successful search',
    type: [PetPresenter],
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
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
