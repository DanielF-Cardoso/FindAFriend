import { GetPetUseCase } from '@/modules/pets/application/get-pet'
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { PetPresenter } from '../presenters/pet.presenter'
import { Public } from '@/app/auth/public'
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { GetPetDto } from '@/modules/pets/dtos/get-pet.dto'
import { PetNotFoundError } from '@/modules/pets/application/errors/pet-not-found-error'

@ApiTags('pets')
@Controller('/pet/:id')
export class GetPetController {
  constructor(private getPetUseCase: GetPetUseCase) {}

  @Get()
  @Public()
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiResponse({
    status: 200,
    description: 'Pet retrieved successfully',
    type: PetPresenter,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Pet not found' })
  async handle(@Param() params: GetPetDto) {
    const { id } = params

    const result = await this.getPetUseCase.execute({ id })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case PetNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { pet: PetPresenter.toHTTP(result.value.pet) }
  }
}
