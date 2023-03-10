import { Controller, Get, Query, Post, Body, Res } from '@nestjs/common'
import { usersDto } from '../dtos/users.dto'
import { UsersService } from '../services/users.service'
import { Response } from 'express'
import { registerDto } from '../../auth/dtos/auth.dto'
import { IApiResponse } from '../../utils/response/response.interface'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getUsers(@Query() { mail }: usersDto, @Res() res: Response): Promise<Response<IApiResponse>> {
        return this.usersService.findUsers({ mail, res })
    }

    @Post('register')
    async register(
        @Body() body: registerDto,
        @Res() res: Response,
    ): Promise<Response<IApiResponse>> {
        return await this.usersService._register({
            body,
            res,
        })
    }
}
