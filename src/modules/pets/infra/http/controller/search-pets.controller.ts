import { SearchPetsUseCase } from '@/modules/pets/application/search-pets'
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { PetPresenter } from '../presenters/pet.presenter'
import { Public } from '@/app/auth/public'
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SearchPetsDto } from '@/modules/pets/dtos/search-pet.dto'
import { PetNotFoundError } from '@/modules/pets/application/errors/pet-not-found-error'

@ApiTags('pets')
@Controller('/pets/search')
export class SearchPetsController {
  constructor(private searchPetsUseCase: SearchPetsUseCase) {}

  @Get()
  @Public()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiQuery({ name: 'city', required: true, type: String })
  @ApiQuery({ name: 'size', required: false, type: String })
  @ApiQuery({ name: 'age', required: false, type: String })
  @ApiQuery({ name: 'energy_level', required: false, type: String })
  @ApiQuery({ name: 'environment', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number, default: 1 })
  @ApiResponse({
    status: 200,
    description: 'Pets retrieved successfully',
    type: PetPresenter,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Pet not found' })
  async handle(@Query() query: SearchPetsDto) {
    const { city, age, size, energy_level, environment, page } = query

    const result = await this.searchPetsUseCase.execute({
      city,
      age,
      size,
      energy_level,
      environment,
      page,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case PetNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const petsWithOrganizations = result.value.pets.map((pet, index) =>
      PetPresenter.toHTTP(pet, result.value.organizations[index]),
    )

    return { pets: petsWithOrganizations }
  }
}
