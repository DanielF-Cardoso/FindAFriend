import { ZodValidationPipe } from '@/app/pipes/zod-validation.pipe'
import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { Public } from '@/app/auth/public'
import { FetchNearbyOrganizationUseCase } from '@/modules/orgs/application/use-cases/fetch-nearby-orgs'
import { OrgPresenter } from '../presenters/org.presenter'

const querySchema = z.object({
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

const queryValidationPipe = new ZodValidationPipe(querySchema)

type QuerySchema = z.infer<typeof querySchema>

@Controller('/orgs/nearby')
export class FetchNearbyOrganizationsController {
  constructor(
    private fetchNearbyOrganizationUseCase: FetchNearbyOrganizationUseCase,
  ) {}

  @Get()
  @Public()
  async handle(@Query(queryValidationPipe) query: QuerySchema) {
    const { latitude, longitude } = query

    const nearbyOrgs = await this.fetchNearbyOrganizationUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
    })

    if (nearbyOrgs.isLeft()) {
      throw new BadRequestException()
    }

    return {
      organizations: nearbyOrgs.value.organization.map(OrgPresenter.toHTTP),
    }
  }
}
