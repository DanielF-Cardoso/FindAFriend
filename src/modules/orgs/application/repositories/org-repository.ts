import { Organization } from '../../domain/entities/org'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export abstract class OrganizationRepository {
  abstract create(org: Organization): Promise<void>
  abstract findByEmail(email: string): Promise<Organization | null>
  abstract findById(id: string): Promise<Organization | null>
  abstract findManyNearby(params: FindManyNearbyParams): Promise<Organization[]>
}
