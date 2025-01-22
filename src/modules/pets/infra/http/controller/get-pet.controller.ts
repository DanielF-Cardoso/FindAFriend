import { GetPetUseCase } from '@/modules/pets/application/get-pet'
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
} from '@nestjs/common'
import { PetPresenter } from '../presenters/pet.presenter'
import { Public } from '@/app/auth/public'
import { ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('/pets/:petId')
export class GetPetController {
  constructor(private getPetUseCase: GetPetUseCase) {}

  @Get()
  @Public()
  @HttpCode(200)
  @ApiParam({ name: 'petId', required: true, type: String })
  @ApiResponse({
    status: 200,
    description: 'Pet retrieved successfully',
    type: PetPresenter,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async handle(@Param('petId') petId: string) {
    const getPet = await this.getPetUseCase.execute({
      id: petId,
    })

    if (getPet.isLeft()) {
      throw new BadRequestException()
    }

    return { pet: PetPresenter.toHTTP(getPet.value.pet) }
  }
}
