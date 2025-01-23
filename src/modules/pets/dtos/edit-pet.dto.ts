import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional } from 'class-validator'

export class EditPetDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  petName?: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  about?: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  age?: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  size?: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  energy_level?: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  environment?: string
}
