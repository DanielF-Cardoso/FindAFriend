import { randomUUID } from 'crypto'
import { UniqueEntityID } from './unique-entity-id'

export abstract class Entity<Props> {
  protected props: Props
  private _id: UniqueEntityID

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props
    this._id = id ?? new UniqueEntityID(id ?? randomUUID())
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true
    }

    if (entity._id === this._id) {
      return true
    }

    return false
  }
}
