import { CurrentUser } from '@/app/auth/current-user-decorator'
import { UserPayload } from '@/app/auth/jwt-strategy'
import { ZodValidationPipe } from '@/app/pipes/zod-validation.pipe'
import { OrganizationAlreadyExistsError } from '@/modules/orgs/application/use-cases/errors/organization-already-exists-error'
import { RegisterPetsUseCase } from '@/modules/pets/application/register-pet'
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

const registerPetBodySchema = z.object({
  petName: z.string(),
  about: z.string(),
  age: z.string(),
  size: z.string(),
  energy_level: z.string(),
  environment: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(registerPetBodySchema)

type RegisterPetBodySchema = z.infer<typeof registerPetBodySchema>

@Controller('/orgs/pets')
export class RegisterPetController {
  constructor(private registerPetUseCase: RegisterPetsUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: RegisterPetBodySchema,
    @CurrentUser() orgId: UserPayload,
  ) {
    const { petName, about, age, size, energy_level, environment } = body

    const registerPet = await this.registerPetUseCase.execute({
      petName,
      about,
      age,
      size,
      energy_level,
      environment,
      organization_id: orgId.sub,
    })

    if (registerPet.isLeft()) {
      const error = registerPet.value

      switch (error.constructor) {
        case OrganizationAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
