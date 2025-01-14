import { OrganizationRepository } from '@/modules/orgs/application/repositories/org-repository'
import { Organization } from '@/modules/orgs/domain/entities/org'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public item: Organization[] = []

  async create(organization: Organization) {
    this.item.push(organization)
  }

  async findByEmail(email: string) {
    const findOrganizationEmail = this.item.find((org) => org.email === email)

    if (!findOrganizationEmail) {
      return null
    }

    return findOrganizationEmail
  }
}
