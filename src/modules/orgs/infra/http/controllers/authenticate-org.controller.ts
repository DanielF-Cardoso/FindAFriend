import { Public } from '@/app/auth/public'
import { ZodValidationPipe } from '@/app/pipes/zod-validation.pipe'
import { AuthenticateOrganizationUseCase } from '@/modules/orgs/application/use-cases/authenticate-org'
import { WrongCredentialsError } from '@/modules/orgs/application/use-cases/errors/wrong-credentials-error'
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

const authenticateOrganizationBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateOrganizationBodySchema = z.infer<
  typeof authenticateOrganizationBodySchema
>

@Controller('/orgs/auth')
@Public()
export class AuthenticateOrganizationController {
  constructor(
    private authenticateOrganizationUseCase: AuthenticateOrganizationUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateOrganizationBodySchema))
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
