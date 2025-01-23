import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class DeletePetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id!: string
}
