import { InMemoryPetsRepository } from 'test/mocks/in-memory-pets-repository'
import { makePet } from 'test/factories/make-pet'
import { GetPetUseCase } from './get-pet'
import { PetNotFoundError } from './errors/pet-not-found-error'

let inMemoryPetsRepository: InMemoryPetsRepository
let sut: GetPetUseCase

describe('Get Pet', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    sut = new GetPetUseCase(inMemoryPetsRepository)
  })

  it('should be able to get a pet', async () => {
    const pet = makePet()
    await inMemoryPetsRepository.create(pet)

    const result = await sut.execute({
      id: pet.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      pet,
    })
  })

  it('should not be able to get a non-existing pet', async () => {
    const result = await sut.execute({
      id: 'invalid-id',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(PetNotFoundError)
  })
})
