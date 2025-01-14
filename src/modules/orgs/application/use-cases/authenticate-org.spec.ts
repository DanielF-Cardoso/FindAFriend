import { InMemoryOrganizationRepository } from 'test/mocks/in-memory-org-repository'
import { makeOrganization } from 'test/factories/make-organization'
import { AuthenticateOrganizationUseCase } from './authenticate-org'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { WrongCredentialsError } from './errors/wrong-credentials-error'

let inMemoryOrganizationRepository: InMemoryOrganizationRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateOrganizationUseCase

describe('Authenticate Organization', () => {
  beforeEach(() => {
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    sut = new AuthenticateOrganizationUseCase(
      inMemoryOrganizationRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authenticate a organization', async () => {
    const organizationData = makeOrganization({
      email: 'test@example.org',
      password: await fakeHasher.hash('password'),
    })

    await inMemoryOrganizationRepository.item.push(organizationData)

    const result = await sut.execute({
      email: 'test@example.org',
      password: 'password',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not be able to authenticate with wrong email', async () => {
    const organizationData = makeOrganization({
      email: 'test@example.org',
      password: 'password',
    })

    await inMemoryOrganizationRepository.item.push(organizationData)

    const result = await sut.execute({
      email: 'wrong@example.org',
      password: 'password',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const organizationData = makeOrganization({
      email: 'test@exemple.org',
      password: 'password',
    })

    await inMemoryOrganizationRepository.item.push(organizationData)

    const result = await sut.execute({
      email: 'test@example.org',
      password: 'wrong',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})
