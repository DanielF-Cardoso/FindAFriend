import { InMemoryOrganizationRepository } from 'test/mocks/in-memory-org-repository'
import { makeOrganization } from 'test/factories/make-organization'
import { InMemoryPetsRepository } from 'test/mocks/in-memory-pets-repository'
import { RegisterPetsUseCase } from './register-pet'
import { makePet } from 'test/factories/make-pet'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { OrganizationNotFoundError } from './errors/organization-not-found-error'

let inMemoryOrganizationRepository: InMemoryOrganizationRepository
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: RegisterPetsUseCase

describe('Register Pet', () => {
  beforeEach(() => {
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetsUseCase(
      inMemoryOrganizationRepository,
      inMemoryPetsRepository,
    )
  })

  it('should be able to create a new pet', async () => {
    const organizationData = makeOrganization()

    console.log(organizationData.id.toString())

    await inMemoryOrganizationRepository.create(organizationData)

    const petData = makePet({
      organization_id: organizationData.id.toString(),
    })

    console.log(organizationData.id.toString())

    const result = await sut.execute(petData)

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      pets: inMemoryPetsRepository.item[0],
    })
  })

  it('should not be able to create a new pet with a non-existing org', async () => {
    const organizationData = makeOrganization()

    await inMemoryOrganizationRepository.create(organizationData)

    const petData = makePet({
      organization_id: new UniqueEntityID().toString(),
    })

    const result = await sut.execute(petData)

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(OrganizationNotFoundError)
  })
})
