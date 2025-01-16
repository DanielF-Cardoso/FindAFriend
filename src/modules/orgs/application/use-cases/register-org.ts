import { Either, left, right } from '../../../../core/either'
import { HasherGenerator } from '../../cryptography/hash-generator'
import { Organization } from '../../domain/entities/org'
import { OrganizationRepository } from '../repositories/org-repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface RegisterOrganizationRequest {
  name: string
  ownerName: string
  email: string
  password: string
  phone: string
  cep: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  longitude: number
  latitude: number
}

type RegisterOrganizationResponse = Either<
  OrganizationAlreadyExistsError,
  {
    organization: Organization
  }
>

export class RegisterOrganizationUseCase {
  constructor(
    private orgRepository: OrganizationRepository,
    private hashGenerator: HasherGenerator,
  ) {}

  async execute({
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
  }: RegisterOrganizationRequest): Promise<RegisterOrganizationResponse> {
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
