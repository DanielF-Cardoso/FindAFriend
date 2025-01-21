import { Injectable } from '@nestjs/common'
import { Either, left, right } from '../../../../core/either'
import { Organization } from '../../domain/entities/org'
import { OrganizationRepository } from '../repositories/org-repository'
import { OrganizationNotFoundError } from './errors/organization-not-found-error'

interface FetchNearbyOrganizationRequest {
  userLatitude: number
  userLongitude: number
}

type FetchNearbyOrganizationResponse = Either<
  OrganizationNotFoundError,
  {
    organization: Organization[]
  }
>

@Injectable()
export class FetchNearbyOrganizationUseCase {
  constructor(private orgRepository: OrganizationRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyOrganizationRequest): Promise<FetchNearbyOrganizationResponse> {
    const findNearbyOrganization = await this.orgRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    if (findNearbyOrganization.length === 0) {
      return left(new OrganizationNotFoundError())
    }

    return right({
      organization: findNearbyOrganization,
    })
  }
}
