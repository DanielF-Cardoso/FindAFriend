import { CurrentUser } from '@/app/auth/current-user-decorator'
import { UserPayload } from '@/app/auth/jwt-strategy'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { EditPetUseCase } from '@/modules/pets/application/edit-pet'
import { NotAllowedError } from '@/modules/pets/application/errors/not-allowed-error'
import { EditPetDto } from '@/modules/pets/dtos/edit-pet.dto'

@ApiTags('organizations')
@Controller('/orgs/pets/:id')
export class EditPetController {
  constructor(private editPetUseCase: EditPetUseCase) {}

  @Put()
  @HttpCode(204)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({ type: EditPetDto })
  @ApiResponse({ status: 204, description: 'Pet updated' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async handle(
    @Body() body: EditPetUseCase,
    @CurrentUser() orgId: UserPayload,
    @Param('id') id: string,
  ) {
    const result = await this.editPetUseCase.execute({
      id,
      ...body,
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
