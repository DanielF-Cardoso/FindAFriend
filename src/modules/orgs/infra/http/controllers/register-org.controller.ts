import { ZodValidationPipe } from '@/app/pipes/zod-validation.pipe'
import { OrganizationAlreadyExistsError } from '@/modules/orgs/application/use-cases/errors/organization-already-exists-error'
import { RegisterOrganizationUseCase } from '@/modules/orgs/application/use-cases/register-org'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

const registerOrganizationBodySchema = z.object({
  name: z.string(),
  ownerName: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
  cep: z.string(),
  street: z.string(),
  number: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  longitude: z.number(),
  latitude: z.number(),
})

type registerOrganizationBodySchema = z.infer<
  typeof registerOrganizationBodySchema
>

@Controller('/orgs')
export class RegisterOrganizationController {
  constructor(
    private registerOrganizationUseCase: RegisterOrganizationUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(registerOrganizationBodySchema))
  async handle(@Body() body: registerOrganizationBodySchema) {
    const {
      name,
      ownerName,
      email,
      password,
      phone,
      cep,
      street,
      number,
      neighborhood,
      city,
      state,
      longitude,
      latitude,
    } = body

    const createOrganization = await this.registerOrganizationUseCase.execute({
      name,
      ownerName,
      email,
      password,
      phone,
      cep,
      street,
      number,
      neighborhood,
      city,
      state,
      longitude,
      latitude,
    })

    if (createOrganization.isLeft()) {
      const error = createOrganization.value

      switch (error.constructor) {
        case OrganizationAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
