import { Organization } from '@/modules/orgs/domain/entities/org'

export class OrgPresenter {
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
