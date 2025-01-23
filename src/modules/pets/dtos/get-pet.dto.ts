import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class GetPetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id!: string
}
