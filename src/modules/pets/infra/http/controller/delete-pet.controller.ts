import { CurrentUser } from '@/app/auth/current-user-decorator'
import { UserPayload } from '@/app/auth/jwt-strategy'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { DeletePetUseCase } from '@/modules/pets/application/delete-pet'
import { DeletePetDto } from '@/modules/pets/dtos/delete-pet'
import { NotAllowedError } from '@/modules/pets/application/errors/not-allowed-error'

@ApiTags('pets')
@Controller('/orgs/pets/:id')
export class DeletePetController {
  constructor(private deletePetUseCase: DeletePetUseCase) {}

  @Delete()
  @HttpCode(204)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({ type: DeletePetDto })
  @ApiResponse({ status: 204, description: 'Pet deleted' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async handle(
    @Param() params: DeletePetDto,
    @CurrentUser() orgId: UserPayload,
  ) {
    const { id } = params
    const result = await this.deletePetUseCase.execute({
      id,
      organization_id: orgId.sub,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case NotAllowedError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
