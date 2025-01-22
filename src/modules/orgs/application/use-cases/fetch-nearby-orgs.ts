import { Injectable } from '@nestjs/common'
import { Either, left, right } from '../../../../core/either'
import { Organization } from '../../domain/entities/org'
import { OrganizationRepository } from '../repositories/org-repository'
import { OrganizationNotFoundError } from './errors/organization-not-found-error'
import { FetchNearbyOrganizationDto } from '../../dtos/fetch-nearby-organization.dto'

type FetchNearbyOrganizationResponse = Either<
  OrganizationNotFoundError,
  {
    organization: Organization[]
  }
>

@Injectable()
export class FetchNearbyOrganizationUseCase {
  constructor(private orgRepository: OrganizationRepository) {}

  async execute(
    dto: FetchNearbyOrganizationDto,
  ): Promise<FetchNearbyOrganizationResponse> {
    const { userLatitude, userLongitude } = dto

    const findNearbyOrganization = await this.orgRepository.findManyNearby({
      userLatitude,
      userLongitude,
    })

    if (findNearbyOrganization.length === 0) {
      return left(new OrganizationNotFoundError())
    }

    return right({
      organization: findNearbyOrganization,
    })
  }
}
