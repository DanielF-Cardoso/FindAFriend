import { GetPetUseCase } from '@/modules/pets/application/get-pet'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { GetPetPresenter } from '../presenters/get-pet.presenter'
import { Public } from '@/app/auth/public'

@Controller('/pets/:petId')
export class GetPetController {
  constructor(private getPetUseCase: GetPetUseCase) {}

  @Get()
  @Public()
  async handle(@Param('petId') petId: string) {
    const getPet = await this.getPetUseCase.execute({
      id: petId,
    })

    if (getPet.isLeft()) {
      throw new BadRequestException()
    }

    return { pet: GetPetPresenter.toHTTP(getPet.value.pet) }
  }
}
