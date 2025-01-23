import { AppModule } from '@/app/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { OrganizationFactory } from 'test/factories/make-organization'
import { PetsDatabaseModule } from '../../database/prisma/pets-database.module'
import { PetFactory } from 'test/factories/make-pet'

describe('Get Pet (E2E)', () => {
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

  test('[GET] /pet/:petId', async () => {
    const makeOrganization = await organizationFactory.makePrismaOrganization()
    const makePet = await petFactory.makePrismaPet({
      organization_id: makeOrganization.id.toString(),
    })

    const response = await request(app.getHttpServer()).get(
      `/pet/${makePet.id}`,
    )

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      pet: expect.objectContaining({
        id: expect.any(String),
        petName: makePet.petName,
        about: makePet.about,
        age: makePet.age,
        size: makePet.size,
        energy_level: makePet.energy_level,
        environment: makePet.environment,
        createdAt: expect.any(String),
      }),
    })
  })
})
