import { AppModule } from '@/app/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { OrganizationFactory } from 'test/factories/make-organization'
import { OrganizationsDatabaseModule } from '../../database/prisma/orgs-database.module'
import { hash } from 'bcryptjs'

describe('Authenticate Organization (E2E)', () => {
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

  test('[POST] /orgs/auth', async () => {
    const organizationData = await organizationFactory.makePrismaOrganization({
      password: await hash('123456', 8),
    })

    const response = await request(app.getHttpServer())
      .post('/orgs/auth')
      .send({
        email: organizationData.email,
        password: '123456',
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
