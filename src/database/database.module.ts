import { Global, Module } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import config from './config'

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [config.KEY],
            useFactory: (configService: ConfigType<typeof config>) => {
                const { user, host, dbName, pwd, port } = configService.postgres
                return {
                    type: 'postgres',
                    host,
                    port,
                    username: user,
                    password: pwd,
                    database: dbName,
                    synchronize: true,
                    autoLoadEntities: true,
                }
            },
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
