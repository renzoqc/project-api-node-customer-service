import { IsString, IsNotEmpty } from 'class-validator'

export class loginDto {
    @IsString()
    @IsNotEmpty()
    mail: string

    @IsString()
    @IsNotEmpty()
    password: string
}

export class registerDto extends loginDto {
    @IsString()
    @IsNotEmpty()
    name: string
}
