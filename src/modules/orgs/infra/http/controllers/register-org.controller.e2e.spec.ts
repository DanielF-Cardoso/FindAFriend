import { AppModule } from '@/app/app.module'
import { PrismaService } from '@/app/database/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { makeOrganization } from 'test/factories/make-organization'

describe('Create Organization (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    await app.init()
  })

  test('[POST] /orgs', async () => {
    const organizationData = makeOrganization()

    const response = await request(app.getHttpServer()).post('/orgs').send({
      name: organizationData.name,
      ownerName: organizationData.ownerName,
      email: organizationData.email,
      password: organizationData.password,
      phone: organizationData.phone,
      cep: organizationData.cep,
      street: organizationData.street,
      number: organizationData.number,
      neighborhood: organizationData.neighborhood,
      city: organizationData.city,
      state: organizationData.state,
      longitude: organizationData.longitude,
      latitude: organizationData.latitude,
    })

    expect(response.statusCode).toBe(201)

    const organizationOnDatabase = await prisma.organization.findUnique({
      where: {
        email: organizationData.email,
      },
    })

    expect(organizationOnDatabase).toBeTruthy()
  })
})
