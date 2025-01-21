import { AppModule } from '@/app/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { OrganizationFactory } from 'test/factories/make-organization'
import { OrganizationsDatabaseModule } from '../../database/prisma/orgs-database.module'

describe('Nearby Orgs (E2E)', () => {
  let app: INestApplication
  let organizationFactory: OrganizationFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, OrganizationsDatabaseModule],
      providers: [OrganizationFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    organizationFactory = moduleRef.get(OrganizationFactory)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /orgs/nearby', async () => {
    const organizationWithin10km =
      await organizationFactory.makePrismaOrganization({
        latitude: -23.55052,
        longitude: -46.633308,
      })

    await organizationFactory.makePrismaOrganization({
      latitude: -23.55052,
      longitude: -46.634308,
    })

    const response = await request(app.getHttpServer())
      .get('/orgs/nearby')
      .query({
        latitude: organizationWithin10km.latitude,
        longitude: organizationWithin10km.longitude,
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.organizations).toHaveLength(2)
  })
})
