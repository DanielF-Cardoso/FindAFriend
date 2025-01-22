import { Injectable } from '@nestjs/common'
import { Either, left, right } from '../../../../core/either'
import { HasherGenerator } from '../../cryptography/hash-generator'
import { Organization } from '../../domain/entities/org'
import { OrganizationRepository } from '../repositories/org-repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'
import { RegisterOrganizationDto } from '../../dtos/register-org.dto'

type RegisterOrganizationResponse = Either<
  OrganizationAlreadyExistsError,
  {
    organization: Organization
  }
>

@Injectable()
export class RegisterOrganizationUseCase {
  constructor(
    private orgRepository: OrganizationRepository,
    private hashGenerator: HasherGenerator,
  ) {}

  async execute(
    dto: RegisterOrganizationDto,
  ): Promise<RegisterOrganizationResponse> {
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
    } = dto

    const organizationWithSameEmail =
      await this.orgRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      return left(new OrganizationAlreadyExistsError('email'))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const organizationData = Organization.create({
      name,
      ownerName,
      email,
      password: hashedPassword,
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

    await this.orgRepository.create(organizationData)

    return right({
      organization: organizationData,
    })
  }
}
