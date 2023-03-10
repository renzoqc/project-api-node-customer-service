import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersController } from './controllers/users.controller'
import { UsersService } from './services/users.service'
import { User } from './entity/user.entity'
// import { AuthService } from "../auth/services/auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
