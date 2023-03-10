import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { Response } from 'express'
import { loginDto } from '../dtos/auth.dto'
import { HttpStatus } from '@nestjs/common'
import apiResponse from '../../utils/response/response'
import { IApiResponse } from '../../utils/response/response.interface'
import { UsersService } from '../../users/services/users.service'
import { ILogin } from '../interfaces/auth.interface'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
const bcrypt = require('bcrypt')
dotenv.config()

@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(() => UsersService)) private userService: UsersService) {}

    async login({ body, res }: { body: loginDto; res: Response }): Promise<Response<IApiResponse>> {
        const context = {
            method: this.login.name,
            body,
        }
        console.log('Trying to login', context)
        const user = await this.userService.findUser({
            options: ['id', 'name', 'mail', 'token'],
            mail: body.mail,
        })

        if (user) {
            return await this.verifyUserLogin({
                body,
                user,
                res,
            })
        }

        console.error('User not found', {
            context,
        })
        return res.status(HttpStatus.NOT_FOUND).send(
            apiResponse({
                message: `User ${body.mail} not found`,
                code: 'USER_NOT_FOUND',
            }),
        )
    }

    async verifyUserLogin({
        body,
        user,
        res,
    }: {
        body: loginDto
        user: ILogin
        res: Response
    }): Promise<Response<IApiResponse>> {
        const context = {
            method: this.verifyUserLogin.name,
            body,
        }

        const JWT_SECRET = process.env.JWT_SECRET
        const validation = await bcrypt.compare(body.password, user.token)

        if (validation) {
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.mail,
                    type: 'user',
                },
                JWT_SECRET,
                { expiresIn: '2h' },
            )
            res.cookie('token', token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true })
            return res.status(HttpStatus.OK).send(
                apiResponse({
                    message: 'Logged user',
                    content: body,
                }),
            )
        }
        console.error('Could not login user: ', {
            context,
        })
        return res.status(HttpStatus.UNAUTHORIZED).send(
            apiResponse({
                message: 'Could not login user',
                content: body,
            }),
        )
    }
}
