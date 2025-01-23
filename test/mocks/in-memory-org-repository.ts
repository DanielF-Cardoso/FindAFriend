import { getDistanceBetweenCoordinates } from '@/core/utils/geo-utils'
import { OrganizationRepository } from '@/modules/orgs/application/repositories/org-repository'
import { Organization } from '@/modules/orgs/domain/entities/org'
import { FetchNearbyOrganizationDto } from '@/modules/orgs/dtos/fetch-nearby-organization.dto'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public item: Organization[] = []

  async create(organization: Organization) {
    this.item.push(organization)
  }

  async findByEmail(email: string) {
    const organization = this.item.find((org) => org.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async findById(id: string) {
    const organization = this.item.find((item) => item.id.toString() === id)

    if (!organization) {
      return null
    }

    return organization
  }

  async findManyNearby(params: FetchNearbyOrganizationDto) {
    return this.item.filter((items) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.userLatitude, longitude: params.userLongitude },
        {
          latitude: items.latitude,
          longitude: items.longitude,
        },
      )

      const kilometersToReturn = 10

      return distance < kilometersToReturn
    })
  }
}
