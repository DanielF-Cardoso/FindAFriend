import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class RegisterOrganizationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  ownerName!: string

  @ApiProperty()
  @IsEmail()
  email!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cep!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  street!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  number!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  neighborhood!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state!: string

  @ApiProperty()
  @IsNumber()
  longitude!: number

  @ApiProperty()
  @IsNumber()
  latitude!: number
}
