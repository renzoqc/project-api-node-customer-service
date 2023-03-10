import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from './controllers/auth.controller'
import { AuthService } from './services/auth.service'
import { UsersService } from '../users/services/users.service'
import { User } from '../users/entity/user.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService, UsersService],
})
export class AuthModule {}
