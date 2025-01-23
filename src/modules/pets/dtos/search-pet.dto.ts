import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, IsNumber, Min } from 'class-validator'
import { Transform } from 'class-transformer'

export class SearchPetsDto {
  @ApiProperty()
  @IsString()
  city!: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  size?: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  age?: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  energy_level?: string

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  environment?: string

  @ApiProperty({ required: false, default: 1 })
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @Min(1)
  @IsOptional()
  page: number = 1
}
