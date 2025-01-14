import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface PetsProps {
  petName: string
  about: string
  age: number
  size: string
  energy_level: string
  environment: string
  organization_id: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Pets extends Entity<PetsProps> {
  get petName() {
    return this.props.petName
  }

  get about() {
    return this.props.about
  }

  get age() {
    return this.props.age
  }

  get size() {
    return this.props.size
  }

  get energy_level() {
    return this.props.energy_level
  }

  get environment() {
    return this.props.environment
  }

  get organization_id() {
    return this.props.organization_id
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: Optional<PetsProps, 'createdAt'>, id?: UniqueEntityID) {
    const pets = new Pets(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return pets
  }
}
