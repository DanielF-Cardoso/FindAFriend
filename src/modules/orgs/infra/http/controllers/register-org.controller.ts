import { Public } from '@/app/auth/public'
import { OrganizationAlreadyExistsError } from '@/modules/orgs/application/use-cases/errors/organization-already-exists-error'
import { RegisterOrganizationUseCase } from '@/modules/orgs/application/use-cases/register-org'
import { RegisterOrganizationDto } from '@/modules/orgs/dtos/register-org.dto'
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

@ApiTags('organizations')
@Controller('/orgs')
export class RegisterOrganizationController {
  constructor(
    private registerOrganizationUseCase: RegisterOrganizationUseCase,
  ) {}

  @Post()
  @Public()
  @ApiBody({ type: RegisterOrganizationDto })
  @ApiResponse({
    status: 201,
    description: 'Organization registered successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async handle(@Body() body: RegisterOrganizationDto) {
    const result = await this.registerOrganizationUseCase.execute(body)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case OrganizationAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
