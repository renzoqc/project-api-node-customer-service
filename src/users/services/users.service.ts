import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Response } from 'express'
import { User } from '../entity/user.entity'
import { createUserDto } from '../dtos/users.dto'
import { HttpStatus } from '@nestjs/common'
import apiResponse from '../../utils/response/response'
import { registerDto } from '../../auth/dtos/auth.dto'
import { IApiResponse } from '../../utils/response/response.interface'
const bcrypt = require('bcrypt')

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findUser({ options, mail }: { options: any; mail: string }): Promise<User> {
        return await this.usersRepository.findOne({
            select: options,
            where: { mail },
        })
    }

    async findUsers({
        mail,
        res,
    }: {
        mail: string
        res: Response
    }): Promise<Response<IApiResponse>> {
        const context = {
            method: this.findUser.name,
            mail,
        }

        if (mail) {
            console.log('Getting user', context)
            const user = await this.findUser({
                options: ['id', 'name', 'mail'],
                mail,
            })
            if (user) {
                return res.status(HttpStatus.OK).send(
                    apiResponse({
                        message: 'User obtained',
                        content: { user },
                    }),
                )
            }
            return res.status(HttpStatus.NOT_FOUND).send(
                apiResponse({
                    message: 'User not found',
                    code: 'USER_NOT_FOUND',
                }),
            )
        }
        console.log('Getting users list', context)
        const users = await this.usersRepository.find()
        if (users) {
            return res.status(HttpStatus.OK).send(
                apiResponse({
                    message: 'Users list obtained',
                    content: { users },
                }),
            )
        }
        return res.status(HttpStatus.NOT_FOUND).send(
            apiResponse({
                message: 'Users list not found',
                code: 'USERS_LIST_NOT_FOUND',
            }),
        )
    }

    async createUser({
        params,
        res,
    }: {
        params: createUserDto
        res: Response
    }): Promise<Response<IApiResponse>> {
        const { name, mail } = params
        const context = {
            method: this.createUser.name,
            body: { name, mail },
        }

        try {
            console.log('Creating user', context)
            await this.usersRepository.save(params)
            return res.status(HttpStatus.CREATED).send(
                apiResponse({
                    message: 'Created user',
                    content: { name, mail },
                }),
            )
        } catch (error) {
            console.error('Could not create user: ', {
                context,
                error,
            })
            return res.status(HttpStatus.BAD_REQUEST).send(
                apiResponse({
                    message: 'Could not create user',
                    content: { name, mail },
                }),
            )
        }
    }

    async _register({
        body,
        res,
    }: {
        body: registerDto
        res: Response
    }): Promise<Response<IApiResponse>> {
        const { name, mail, password } = body
        const _hashedPwd = await this._hashPwd({ password })
        return await this.createUser({
            params: { name, mail, token: _hashedPwd },
            res,
        })
    }

    async _hashPwd({ password }: { password: string }): Promise<string> {
        return await bcrypt.hash(password, 10)
    }
}
