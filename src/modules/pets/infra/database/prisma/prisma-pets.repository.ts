import {
  FindAllPetsParams,
  PetsRepository,
} from '@/modules/pets/application/repositories/pets-repository'
import { Pets } from '@/modules/pets/domain/entities/pets'
import { PrismaPetsMapper } from '../mappers/prisma-pets.mapper'
import { PrismaService } from '@/app/database/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaPetsRepository implements PetsRepository {
  constructor(private prisma: PrismaService) {}

  async create(pet: Pets): Promise<void> {
    const data = PrismaPetsMapper.toPersistence(pet)
    await this.prisma.pet.create({ data })
  }

  async delete(pet: Pets): Promise<void> {
    await this.prisma.pet.delete({
      where: { id: pet.id.toString() },
    })
  }

  async save(pet: Pets): Promise<void> {
    const data = PrismaPetsMapper.toPersistence(pet)
    await this.prisma.pet.update({
      where: { id: pet.id.toString() },
      data,
    })
  }

  async findById(id: string): Promise<Pets | null> {
    const pet = await this.prisma.pet.findUnique({
      where: { id },
    })

    if (!pet) {
      return null
    }

    return PrismaPetsMapper.toDomain(pet)
  }

  async findAll(params: FindAllPetsParams): Promise<Pets[]> {
    const pageSize = 20
    const skip = (params.page - 1) * pageSize

    const pets = await this.prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        energy_level: params.energy_level,
        environment: params.environment,
        organization: {
          city: params.city,
        },
      },
      skip,
      take: pageSize,
    })

    return pets.map((pet) => PrismaPetsMapper.toDomain(pet))
  }
}
