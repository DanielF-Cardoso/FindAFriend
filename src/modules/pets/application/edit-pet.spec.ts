import { InMemoryOrganizationRepository } from 'test/mocks/in-memory-org-repository'
import { makeOrganization } from 'test/factories/make-organization'
import { InMemoryPetsRepository } from 'test/mocks/in-memory-pets-repository'
import { makePet } from 'test/factories/make-pet'
import { EditPetUseCase } from './edit-pet'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryOrganizationRepository: InMemoryOrganizationRepository
let inMemoryPetsRepository: InMemoryPetsRepository
let sut: EditPetUseCase

describe('Edit Pet', () => {
  beforeEach(() => {
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryOrganizationRepository,
    )
    sut = new EditPetUseCase(
      inMemoryOrganizationRepository,
      inMemoryPetsRepository,
    )
  })

  it('should be able to edit a pet', async () => {
    const organizationData = makeOrganization()
    await inMemoryOrganizationRepository.create(organizationData)

    const petData = makePet({
      organization_id: organizationData.id.toString(),
    })
    await inMemoryPetsRepository.create(petData)

    const result = await sut.execute({
      id: petData.id.toString(),
      petName: 'new pet name',
      about: 'new about',
      age: '2',
      size: 'new size',
      energy_level: 'new energy level',
      environment: 'new environment',
      organization_id: organizationData.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryPetsRepository.item[0]).toMatchObject({
      petName: 'new pet name',
      about: 'new about',
      age: '2',
      size: 'new size',
      energy_level: 'new energy level',
      environment: 'new environment',
    })
  })

  it('should not be able to edit a pet with a wrong org', async () => {
    const organizationData = makeOrganization()
    await inMemoryOrganizationRepository.create(organizationData)

    const petData = makePet({
      organization_id: organizationData.id.toString(),
    })
    await inMemoryPetsRepository.create(petData)

    const result = await sut.execute({
      id: petData.id.toString(),
      petName: 'new pet name',
      about: 'new about',
      age: '2',
      size: 'new size',
      energy_level: 'new energy level',
      environment: 'new environment',
      organization_id: 'wrong-org-id',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
