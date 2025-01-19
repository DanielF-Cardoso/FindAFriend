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

  async findById(id: string): Promise<Pets | null> {
    const pet = await this.prisma.pet.findUnique({
      where: { id },
    })

    if (!pet) {
      return null
    }

    return PrismaPetsMapper.toDomain(pet)
  }

  findAll(params: FindAllPetsParams): Promise<Pets[]> {
    throw new Error('Method not implemented.')
  }
}
