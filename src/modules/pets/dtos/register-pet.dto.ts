import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class RegisterPetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  petName!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  about!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  age!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  size!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  energy_level!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  environment!: string
}
