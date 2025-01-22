import { ApiProperty } from '@nestjs/swagger'
import { IsLatitude, IsLongitude } from 'class-validator'

export class FetchNearbyOrganizationDto {
  @ApiProperty()
  @IsLatitude()
  userLatitude!: number

  @ApiProperty()
  @IsLongitude()
  userLongitude!: number
}
