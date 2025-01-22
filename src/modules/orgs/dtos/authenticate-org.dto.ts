import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthenticateOrganizationDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password!: string
}
