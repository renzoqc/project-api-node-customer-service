import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { ConfigModule } from '@nestjs/config'
import { DataSource } from 'typeorm'
import config from './database/config'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            load: [config],
            isGlobal: true,
        }),
        DatabaseModule,
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
