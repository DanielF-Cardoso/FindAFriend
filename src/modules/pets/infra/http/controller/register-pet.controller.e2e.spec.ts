import { AppModule } from '@/app/app.module'
import { PrismaService } from '@/app/database/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { OrganizationFactory } from 'test/factories/make-organization'
import { PetsDatabaseModule } from '../../database/prisma/pets-database.module'
import { JwtService } from '@nestjs/jwt'

describe('Register Pet (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let organizationFactory: OrganizationFactory
  let jwtService: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, PetsDatabaseModule],
      providers: [OrganizationFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    organizationFactory = moduleRef.get(OrganizationFactory)

    jwtService = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /orgs/pets', async () => {
    const organizationData = await organizationFactory.makePrismaOrganization()

    const accessToken = jwtService.sign({ sub: organizationData.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/orgs/pets')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        petName: 'Dexter',
        about: 'Dexter is a very playful cat',
        age: '2',
        size: 'small',
        energy_level: 'high',
        environment: 'indoor',
      })

    expect(response.statusCode).toBe(201)

    const petOnDatabase = await prisma.pet.findFirst({
      where: {
        petName: 'Dexter',
      },
    })

    expect(petOnDatabase).toBeTruthy()
  })
})
