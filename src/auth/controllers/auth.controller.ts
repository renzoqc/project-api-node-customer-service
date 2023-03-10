import { Controller, Post, Body, Res } from '@nestjs/common'
import { loginDto } from '../dtos/auth.dto'
import { AuthService } from '../services/auth.service'
import { Response } from 'express'
import { IApiResponse } from '../../utils/response/response.interface'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body: loginDto, @Res() res: Response): Promise<Response<IApiResponse>> {
        return await this.authService.login({
            body,
            res,
        })
    }
}
