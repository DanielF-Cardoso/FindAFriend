import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'

interface OrganizationProps {
  name: string
  ownerName: string
  email: string
  password: string
  phone: string
  cep: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  longitude: number
  latitude: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Organization extends Entity<OrganizationProps> {
  get name() {
    return this.props.name
  }

  get ownerName() {
    return this.props.ownerName
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get phone() {
    return this.props.phone
  }

  get cep() {
    return this.props.cep
  }

  get street() {
    return this.props.street
  }

  get number() {
    return this.props.number
  }

  get neighborhood() {
    return this.props.neighborhood
  }

  get city() {
    return this.props.city
  }

  get state() {
    return this.props.state
  }

  get longitude() {
    return this.props.longitude
  }

  get latitude() {
    return this.props.latitude
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(
    props: Optional<OrganizationProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const organization = new Organization(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return organization
  }
}
