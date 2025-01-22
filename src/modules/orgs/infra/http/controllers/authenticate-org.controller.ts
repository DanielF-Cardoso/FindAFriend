import { Public } from '@/app/auth/public'
import { ZodValidationPipe } from '@/app/pipes/zod-validation.pipe'
import { AuthenticateOrganizationUseCase } from '@/modules/orgs/application/use-cases/authenticate-org'
import { WrongCredentialsError } from '@/modules/orgs/application/use-cases/errors/wrong-credentials-error'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'
import { z } from 'zod'

const authenticateOrganizationBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateOrganizationBodySchema = z.infer<
  typeof authenticateOrganizationBodySchema
>

@ApiTags('organizations')
@Controller('/orgs/auth')
export class AuthenticateOrganizationController {
  constructor(
    private authenticateOrganizationUseCase: AuthenticateOrganizationUseCase,
  ) {}

  @Post()
  @Public()
  @UsePipes(new ZodValidationPipe(authenticateOrganizationBodySchema))
  @HttpCode(200)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
    },
  })
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
  async handle(@Body() body: AuthenticateOrganizationBodySchema) {
    const { email, password } = body

    const authenticateOrganization =
      await this.authenticateOrganizationUseCase.execute({
        email,
        password,
      })

    if (authenticateOrganization.isLeft()) {
      const error = authenticateOrganization.value

      switch (error.constructor) {
        case WrongCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const { accessToken } = authenticateOrganization.value

    return {
      access_token: accessToken,
    }
  }
}
