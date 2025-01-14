import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryOrganizationRepository } from 'test/mocks/in-memory-org-repository'
import { RegisterOrganizationUseCase } from './register-org'
import { makeOrganization } from 'test/factories/make-organization'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

let inMemoryOrganizationRepository: InMemoryOrganizationRepository
let fakeHasher: FakeHasher
let sut: RegisterOrganizationUseCase

describe('Register Organization', () => {
  beforeEach(() => {
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterOrganizationUseCase(
      inMemoryOrganizationRepository,
      fakeHasher,
    )
  })

  it('should be able to create a new organization', async () => {
    const organizationData = makeOrganization()

    const result = await sut.execute(organizationData)

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      organization: inMemoryOrganizationRepository.item[0],
    })
  })

  it('should not be able to create a new organization with an already used email', async () => {
    const organizationData = makeOrganization({ email: 'test@example.com' })

    await sut.execute(organizationData)

    const result = await sut.execute(organizationData)

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
