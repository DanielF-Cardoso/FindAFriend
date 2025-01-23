import { InMemoryOrganizationRepository } from 'test/mocks/in-memory-org-repository'
import { makeOrganization } from 'test/factories/make-organization'
import { InMemoryPetsRepository } from 'test/mocks/in-memory-pets-repository'
import { makePet } from 'test/factories/make-pet'
import { DeletePetUseCase } from './delete-pet'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryOrganizationRepository: InMemoryOrganizationRepository
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: DeletePetUseCase

describe('Delete Pet', () => {
  beforeEach(() => {
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryOrganizationRepository,
    )
    sut = new DeletePetUseCase(
      inMemoryOrganizationRepository,
      inMemoryPetsRepository,
    )
  })

  it('should be able to delete a new pet', async () => {
    const organizationData = makeOrganization()

    await inMemoryOrganizationRepository.create(organizationData)

    const petData = makePet({
      organization_id: organizationData.id.toString(),
    })

    await inMemoryPetsRepository.create(petData)

    await sut.execute({
      id: petData.id.toString(),
      organization_id: organizationData.id.toString(),
    })

    expect(inMemoryPetsRepository.item).toHaveLength(0)
  })

  it('should not be able to delete a new pet with a wrong org', async () => {
    const organizationData = makeOrganization()
    await inMemoryOrganizationRepository.create(organizationData)

    const anotherOrganizationData = makeOrganization()
    await inMemoryOrganizationRepository.create(anotherOrganizationData)

    const petData = makePet({
      organization_id: organizationData.id.toString(),
    })

    await inMemoryPetsRepository.create(petData)

    const result = await sut.execute({
      id: petData.id.toString(),
      organization_id: anotherOrganizationData.id.toString(),
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
