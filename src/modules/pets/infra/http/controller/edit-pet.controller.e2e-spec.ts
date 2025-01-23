import { AppModule } from '@/app/app.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { OrganizationFactory } from 'test/factories/make-organization'
import { PetsDatabaseModule } from '../../database/prisma/pets-database.module'
import { PetFactory } from 'test/factories/make-pet'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/app/database/prisma.service'

describe('Edit Pet (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
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

    prisma = moduleRef.get(PrismaService)
    jwtService = moduleRef.get(JwtService)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  test('[PUT] orgs/pets/:id', async () => {
    const makeOrganization = await organizationFactory.makePrismaOrganization()

    const accessToken = jwtService.sign({ sub: makeOrganization.id.toString() })

    const makePet = await petFactory.makePrismaPet({
      organization_id: makeOrganization.id.toString(),
    })

    const response = await request(app.getHttpServer())
      .put(`/orgs/pets/${makePet.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        petName: 'Dexter',
        about: 'Dexter is a very playful cat',
        age: '3',
        size: 'small',
        energy_level: 'high',
        environment: 'indoor',
      })

    expect(response.statusCode).toBe(204)

    const petOnDatabase = await prisma.pet.findFirst({
      where: {
        petName: 'Dexter',
      },
    })

    expect(petOnDatabase).toBeTruthy()
  })
})
