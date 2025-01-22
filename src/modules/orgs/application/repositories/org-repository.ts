import { Organization } from '../../domain/entities/org'
import { FetchNearbyOrganizationDto } from '../../dtos/fetch-nearby-organization.dto'

export abstract class OrganizationRepository {
  abstract create(org: Organization): Promise<void>
  abstract findByEmail(email: string): Promise<Organization | null>
  abstract findById(id: string): Promise<Organization | null>
  abstract findManyNearby(
    params: FetchNearbyOrganizationDto,
  ): Promise<Organization[]>
}
