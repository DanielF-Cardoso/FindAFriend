import { Public } from '@/app/auth/public'
import { AuthenticateOrganizationUseCase } from '@/modules/orgs/application/use-cases/authenticate-org'
import { WrongCredentialsError } from '@/modules/orgs/application/use-cases/errors/wrong-credentials-error'
import { AuthenticateOrganizationDto } from '@/modules/orgs/dtos/authenticate-org.dto'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('organizations')
@Controller('/orgs/auth')
export class AuthenticateOrganizationController {
  constructor(
    private authenticateOrganizationUseCase: AuthenticateOrganizationUseCase,
  ) {}

  @Post()
  @Public()
  @UsePipes(new ValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiBody({ type: AuthenticateOrganizationDto })
  @ApiResponse({
    status: 200,
    description: 'Authentication successful',
    schema: {
      type: 'object',
      properties: { access_token: { type: 'string' } },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async handle(@Body() body: AuthenticateOrganizationDto) {
    const { email, password } = body

    const result = await this.authenticateOrganizationUseCase.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
