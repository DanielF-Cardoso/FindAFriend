import { OrgPresenter } from '@/modules/orgs/infra/http/presenters/org.presenter'
import { Pets } from '@/modules/pets/domain/entities/pets'
import { ApiProperty } from '@nestjs/swagger'
import { Organization } from '@/modules/orgs/domain/entities/org'

export class PetPresenter {
  @ApiProperty({ example: '123', description: 'The ID of the pet' })
  id!: string

  @ApiProperty({ example: 'Buddy', description: 'The name of the pet' })
  petName!: string

  @ApiProperty({
    example: 'A friendly dog',
    description: 'Description about the pet',
  })
  about!: string

  @ApiProperty({ example: '2', description: 'The age of the pet' })
  age!: string

  @ApiProperty({ example: 'Medium', description: 'The size of the pet' })
  size!: string

  @ApiProperty({ example: 'High', description: 'The energy level of the pet' })
  energy_level!: string

  @ApiProperty({
    example: 'Indoor',
    description: 'The environment the pet is suited for',
  })
  environment!: string

  @ApiProperty({
    example: '2023-01-01T00:00:00Z',
    description: 'The date when the pet was created',
  })
  createdAt!: Date

  @ApiProperty({ type: OrgPresenter })
  organization!: OrgPresenter

  static toHTTP(pet: Pets, organization: Organization) {
    return {
      id: pet.id.toString(),
      petName: pet.petName,
      about: pet.about,
      age: pet.age,
      size: pet.size,
      energy_level: pet.energy_level,
      environment: pet.environment,
      createdAt: pet.createdAt,
      organization: OrgPresenter.toHTTP(organization),
    }
  }
}
