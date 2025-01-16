import { InMemoryOrganizationRepository } from 'test/mocks/in-memory-org-repository'
import { makeOrganization } from 'test/factories/make-organization'
import { FetchNearbyOrganizationUseCase } from './fetch-nearby-orgs'
import { OrganizationNotFoundError } from './errors/organization-not-found-error'

let inMemoryOrganizationRepository: InMemoryOrganizationRepository
let sut: FetchNearbyOrganizationUseCase

describe('Fetch Nearby Organizations', () => {
  beforeEach(() => {
    inMemoryOrganizationRepository = new InMemoryOrganizationRepository()
    sut = new FetchNearbyOrganizationUseCase(inMemoryOrganizationRepository)
  })

  it('should be able to fetch a nearby organization', async () => {
    const organizationData = makeOrganization()

    await inMemoryOrganizationRepository.item.push(organizationData)

    const result = await sut.execute({
      userLatitude: organizationData.latitude,
      userLongitude: organizationData.longitude,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      organization: expect.arrayContaining([
        expect.objectContaining({
          id: organizationData.id,
        }),
      ]),
    })
  })

  it('should be able to fetch a within a 10km radius organization', async () => {
    const organizationWithin10km = makeOrganization({
      latitude: -23.55052,
      longitude: -46.633308,
    })

    const anotherOrganizationWithin10km = makeOrganization({
      latitude: -23.55052,
      longitude: -46.634308,
    })

    const organizationBeyond10km = makeOrganization({
      latitude: -23.6820636,
      longitude: -46.875497,
    })

    await inMemoryOrganizationRepository.item.push(
      organizationWithin10km,
      anotherOrganizationWithin10km,
      organizationBeyond10km,
    )

    const result = await sut.execute({
      userLatitude: organizationWithin10km.latitude,
      userLongitude: organizationWithin10km.longitude,
    })

    expect(result.value).toEqual({
      organization: expect.arrayContaining([
        expect.objectContaining({
          id: organizationWithin10km.id,
        }),
        expect.objectContaining({
          id: anotherOrganizationWithin10km.id,
        }),
      ]),
    })

    expect(result.value).not.toEqual({
      organization: expect.arrayContaining([
        expect.objectContaining({
          id: organizationBeyond10km.id,
        }),
      ]),
    })
  })

  it('should not be able to fetch a far away organization', async () => {
    const organizationData = makeOrganization({
      latitude: -23.6820636,
      longitude: -46.9249454,
    })

    await inMemoryOrganizationRepository.item.push(organizationData)

    const result = await sut.execute({
      userLatitude: -22.6820656,
      userLongitude: -45.9249454,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(OrganizationNotFoundError)
  })
})
