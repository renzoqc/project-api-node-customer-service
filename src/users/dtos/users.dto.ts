import { IsOptional, IsString, IsNotEmpty } from 'class-validator'

export class usersDto {
    @IsOptional()
    mail: string
}

export class createUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    mail: string

    @IsString()
    @IsNotEmpty()
    token: string
}
