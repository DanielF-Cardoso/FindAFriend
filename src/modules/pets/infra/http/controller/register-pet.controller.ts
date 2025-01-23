import { CurrentUser } from '@/app/auth/current-user-decorator'
import { UserPayload } from '@/app/auth/jwt-strategy'
import { RegisterPetsUseCase } from '@/modules/pets/application/register-pet'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { OrganizationNotFoundError } from '@/modules/orgs/application/use-cases/errors/organization-not-found-error'
import { RegisterPetDto } from '@/modules/pets/dtos/register-pet.dto'

@ApiTags('pets')
@Controller('/orgs/pets')
export class RegisterPetController {
  constructor(private registerPetUseCase: RegisterPetsUseCase) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBody({ type: RegisterPetDto })
  @ApiResponse({ status: 201, description: 'Pet registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 409, description: 'Conflict' })
  async handle(
    @Body() body: RegisterPetDto,
    @CurrentUser() orgId: UserPayload,
  ) {
    const result = await this.registerPetUseCase.execute({
      ...body,
      organization_id: orgId.sub,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case OrganizationNotFoundError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return result.value
  }
}
