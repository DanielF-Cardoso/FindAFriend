import { AppModule } from '@/app/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { OrganizationFactory } from 'test/factories/make-organization'
import { PetsDatabaseModule } from '../../database/prisma/pets-database.module'
import { PetFactory } from 'test/factories/make-pet'
import { JwtService } from '@nestjs/jwt'

describe('Delete Pet (E2E)', () => {
  let app: INestApplication
  let organizationFactory: OrganizationFactory
  let petFactory: PetFactory
  let jwtService: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PetsDatabaseModule],
      providers: [OrganizationFactory, PetFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    organizationFactory = moduleRef.get(OrganizationFactory)
    petFactory = moduleRef.get(PetFactory)

    jwtService = moduleRef.get(JwtService)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[GET] /pet/:petId', async () => {
    const makeOrganization = await organizationFactory.makePrismaOrganization()

    const accessToken = jwtService.sign({ sub: makeOrganization.id.toString() })

    const makePet = await petFactory.makePrismaPet({
      organization_id: makeOrganization.id.toString(),
    })

    const response = await request(app.getHttpServer())
      .delete(`/orgs/pets/${makePet.id}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(204)
  })
})
