import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Public } from '@/app/auth/public'
import { FetchNearbyOrganizationUseCase } from '@/modules/orgs/application/use-cases/fetch-nearby-orgs'
import { OrgPresenter } from '../presenters/org.presenter'
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { FetchNearbyOrganizationDto } from '@/modules/orgs/dtos/fetch-nearby-organization.dto'

@ApiTags('organizations')
@Controller('/orgs/nearby')
export class FetchNearbyOrganizationsController {
  constructor(
    private fetchNearbyOrganizationUseCase: FetchNearbyOrganizationUseCase,
  ) {}

  @Get()
  @Public()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiQuery({ name: 'userLatitude', required: true, type: Number })
  @ApiQuery({ name: 'userLongitude', required: true, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Nearby organizations fetched successfully',
    type: [OrgPresenter],
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async handle(@Query() query: FetchNearbyOrganizationDto) {
    const { userLatitude, userLongitude } = query

    const nearbyOrgs = await this.fetchNearbyOrganizationUseCase.execute({
      userLatitude,
      userLongitude,
    })

    if (nearbyOrgs.isLeft()) {
      throw new BadRequestException()
    }

    return {
      organizations: nearbyOrgs.value.organization.map(OrgPresenter.toHTTP),
    }
  }
}
