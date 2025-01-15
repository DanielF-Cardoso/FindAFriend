import { SearchPetsUseCase } from './search-pets'
import { makeOrganization } from 'test/factories/make-organization'
import { makePet } from 'test/factories/make-pet'
import { InMemoryOrganizationRepository } from 'test/mocks/in-memory-org-repository'
import { InMemoryPetsRepository } from 'test/mocks/in-memory-pets-repository'

let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryOrganizationRepository: InMemoryOrganizationRepository
let sut: SearchPetsUseCase

describe('Search Pets', () => {
  beforeEach(() => {
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository()
    inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryOrganizationRepository,
    )
    sut = new SearchPetsUseCase(inMemoryPetsRepository)
  })

  it('should be able to search pets by city', async () => {
    const createOrganization = makeOrganization({
      city: 'São Paulo',
    })

    await inMemoryOrganizationRepository.create(createOrganization)

    const createFirstPet = makePet({
      organization_id: createOrganization.id.toString(),
    })

    const createSecondPet = makePet({
      organization_id: createOrganization.id.toString(),
    })

    await inMemoryPetsRepository.create(createFirstPet)
    await inMemoryPetsRepository.create(createSecondPet)

    const result = await sut.execute({
      city: 'São Paulo',
    })

    expect(result.value?.pets).toHaveLength(2)
    expect(result.value?.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          petName: createFirstPet.petName,
        }),
        expect.objectContaining({
          petName: createSecondPet.petName,
        }),
      ]),
    )
    result.value?.pets.forEach((pet) => {
      const petOrganization = inMemoryOrganizationRepository.item.find(
        (org) => org.id.toString() === pet.organization_id,
      )
      expect(petOrganization?.city).toBe('São Paulo')
    })
  })

  it('should be able to search pets by city and size', async () => {
    const createOrganization = makeOrganization({
      city: 'São Paulo',
    })

    await inMemoryOrganizationRepository.create(createOrganization)

    const createSmallPet = makePet({
      organization_id: createOrganization.id.toString(),
      size: 'small',
    })

    const createMediumPet = makePet({
      organization_id: createOrganization.id.toString(),
      size: 'medium',
    })

    const createLargePet = makePet({
      organization_id: createOrganization.id.toString(),
      size: 'large',
    })

    await inMemoryPetsRepository.create(createSmallPet)
    await inMemoryPetsRepository.create(createMediumPet)
    await inMemoryPetsRepository.create(createLargePet)

    const result = await sut.execute({
      city: 'São Paulo',
      size: 'small',
    })

    expect(result.value?.pets).toHaveLength(1)
    expect(result.value?.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          petName: createSmallPet.petName,
          size: 'small',
        }),
      ]),
    )
    result.value?.pets.forEach((pet) => {
      const petOrganization = inMemoryOrganizationRepository.item.find(
        (org) => org.id.toString() === pet.organization_id,
      )
      expect(petOrganization?.city).toBe('São Paulo')
    })
  })

  it('should be able to search pets by city and age', async () => {
    const createOrganization = makeOrganization({
      city: 'São Paulo',
    })

    await inMemoryOrganizationRepository.create(createOrganization)

    const oneYearOldPet = makePet({
      organization_id: createOrganization.id.toString(),
      age: 1,
    })

    const twoYearOldPet = makePet({
      organization_id: createOrganization.id.toString(),
      age: 2,
    })

    await inMemoryPetsRepository.create(oneYearOldPet)
    await inMemoryPetsRepository.create(twoYearOldPet)

    const result = await sut.execute({
      city: 'São Paulo',
      age: '1',
    })

    expect(result.value?.pets).toHaveLength(1)
    expect(result.value?.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          age: 1,
        }),
      ]),
    )
    result.value?.pets.forEach((pet) => {
      const petOrganization = inMemoryOrganizationRepository.item.find(
        (org) => org.id.toString() === pet.organization_id,
      )
      expect(petOrganization?.city).toBe('São Paulo')
    })
  })

  it('should be able to search pets by city and energy level', async () => {
    const createOrganization = makeOrganization({
      city: 'São Paulo',
    })

    await inMemoryOrganizationRepository.create(createOrganization)

    const createLowEnergyPet = makePet({
      organization_id: createOrganization.id.toString(),
      energy_level: 'low',
    })

    const createHighEnergyPet = makePet({
      organization_id: createOrganization.id.toString(),
      energy_level: 'high',
    })

    await inMemoryPetsRepository.create(createLowEnergyPet)
    await inMemoryPetsRepository.create(createHighEnergyPet)

    const result = await sut.execute({
      city: 'São Paulo',
      energy_level: 'low',
    })

    expect(result.value?.pets).toHaveLength(1)
    expect(result.value?.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          energy_level: 'low',
        }),
      ]),
    )
    result.value?.pets.forEach((pet) => {
      const petOrganization = inMemoryOrganizationRepository.item.find(
        (org) => org.id.toString() === pet.organization_id,
      )
      expect(petOrganization?.city).toBe('São Paulo')
    })
  })

  it('should be able to search pets by city and environment', async () => {
    const createOrganization = makeOrganization({
      city: 'São Paulo',
    })

    await inMemoryOrganizationRepository.create(createOrganization)

    const createIndoorPet = makePet({
      organization_id: createOrganization.id.toString(),
      environment: 'indoor',
    })

    const createOutdoorPet = makePet({
      organization_id: createOrganization.id.toString(),
      environment: 'outdoor',
    })

    await inMemoryPetsRepository.create(createIndoorPet)
    await inMemoryPetsRepository.create(createOutdoorPet)

    const result = await sut.execute({
      city: 'São Paulo',
      environment: 'indoor',
    })

    expect(result.value?.pets).toHaveLength(1)
    expect(result.value?.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          environment: 'indoor',
        }),
      ]),
    )
    result.value?.pets.forEach((pet) => {
      const petOrganization = inMemoryOrganizationRepository.item.find(
        (org) => org.id.toString() === pet.organization_id,
      )
      expect(petOrganization?.city).toBe('São Paulo')
    })
  })
})
