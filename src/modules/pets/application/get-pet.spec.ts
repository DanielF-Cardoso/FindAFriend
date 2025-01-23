import { InMemoryPetsRepository } from 'test/mocks/in-memory-pets-repository'
import { makePet } from 'test/factories/make-pet'
import { GetPetUseCase } from './get-pet'
import { PetNotFoundError } from './errors/pet-not-found-error'
import { InMemoryOrganizationRepository } from 'test/mocks/in-memory-org-repository'
import { makeOrganization } from 'test/factories/make-organization'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryOrganizationsRepository: InMemoryOrganizationRepository
let sut: GetPetUseCase

describe('Get Pet', () => {
  beforeEach(() => {
    inMemoryOrganizationsRepository = new InMemoryOrganizationRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryOrganizationsRepository,
    )
    sut = new GetPetUseCase(
      inMemoryPetsRepository,
      inMemoryOrganizationsRepository,
    )
  })

  it('should be able to get a pet', async () => {
    const createOrganization = makeOrganization()

    await inMemoryOrganizationsRepository.create(createOrganization)

    const createPet = makePet({
      organization_id: createOrganization.id.toString(),
    })

    await inMemoryPetsRepository.create(createPet)

    const result = await sut.execute({
      id: createPet.id.toString(),
    })

    if (result.isLeft()) {
      throw new Error('Pet not found')
    }

    expect(result.value.pet.petName).toBe(createPet.petName)
  })

  it('should not be able to get a non-existing pet', async () => {
    const result = await sut.execute({
      id: 'invalid-id',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(PetNotFoundError)
  })
})
