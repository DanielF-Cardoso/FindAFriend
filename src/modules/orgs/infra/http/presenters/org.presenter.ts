import { Organization } from '@/modules/orgs/domain/entities/org'
import { ApiProperty } from '@nestjs/swagger'

export class OrgPresenter {
  @ApiProperty({ example: '123', description: 'The ID of the organization' })
  id!: string

  @ApiProperty({
    example: 'Organization Name',
    description: 'The name of the organization',
  })
  name!: string

  @ApiProperty({
    example: 'Joeh Doe',
    description: 'The name of the owner of the organization',
  })
  ownerName!: string

  @ApiProperty({
    example: 'organization@example.com',
    description: 'The email of the organization',
  })
  email!: string

  @ApiProperty({
    example: '1234567890',
    description: 'The phone number of the organization',
  })
  phone!: string

  @ApiProperty({
    example: '12345-678',
    description: 'The postal code (CEP) of the organization',
  })
  cep!: string

  @ApiProperty({
    example: 'Street Name',
    description: 'The street address of the organization',
  })
  street!: string

  @ApiProperty({
    example: '123',
    description: 'The street number of the organization',
  })
  number!: string

  @ApiProperty({
    example: 'Neighborhood Name',
    description: 'The neighborhood where the organization is located',
  })
  neighborhood!: string

  @ApiProperty({
    example: 'City Name',
    description: 'The city where the organization is located',
  })
  city!: string

  @ApiProperty({
    example: 'State Name',
    description: 'The state where the organization is located',
  })
  state!: string

  @ApiProperty({
    example: -46.123456,
    description: 'The longitude of the organization',
  })
  longitude!: number

  @ApiProperty({
    example: -23.123456,
    description: 'The latitude of the organization',
  })
  latitude!: number

  @ApiProperty({
    example: '2021-09-01T00:00:00.000Z',
    description: 'The date and time the organization was created',
  })
  createdAt!: Date

  static toHTTP(org: Organization) {
    return {
      id: org.id.toString(),
      name: org.name,
      ownerName: org.ownerName,
      email: org.email,
      phone: org.phone,
      cep: org.cep,
      street: org.street,
      number: org.number,
      neighborhood: org.neighborhood,
      city: org.city,
      state: org.state,
      longitude: org.longitude,
      latitude: org.latitude,
      createdAt: org.createdAt,
    }
  }
}
