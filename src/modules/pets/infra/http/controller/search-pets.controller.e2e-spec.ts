import { AppModule } from '@/app/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { OrganizationFactory } from 'test/factories/make-organization'
import { PetFactory } from 'test/factories/make-pet'
import { PetsDatabaseModule } from '../../database/prisma/pets-database.module'

describe('Search Pets (E2E)', () => {
  let app: INestApplication
  let organizationFactory: OrganizationFactory
  let petFactory: PetFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PetsDatabaseModule],
      providers: [OrganizationFactory, PetFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    organizationFactory = moduleRef.get(OrganizationFactory)
    petFactory = moduleRef.get(PetFactory)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /pets', async () => {
    const organizationData = await organizationFactory.makePrismaOrganization()

    for (let i = 0; i < 25; i++) {
      await petFactory.makePrismaPet({
        organization_id: organizationData.id.toString(),
      })
    }

    const responsePage1 = await request(app.getHttpServer())
      .get('/pets')
      .query({ city: organizationData.city, page: '1' })

    expect(responsePage1.statusCode).toBe(200)
    expect(responsePage1.body.pets).toHaveLength(20)

    const responsePage2 = await request(app.getHttpServer())
      .get('/pets')
      .query({ city: organizationData.city, page: '2' })

    expect(responsePage2.statusCode).toBe(200)
    expect(responsePage2.body.pets).toHaveLength(5)
  })
})
