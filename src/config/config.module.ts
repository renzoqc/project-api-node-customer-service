import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppConfigService } from './providers/configuration.service'

const env = process.env.NODE_ENV || ''
@Module({
    imports: [ConfigModule.forRoot({ envFilePath: `${env}.env`, isGlobal: true })],
    providers: [
        AppConfigService,
    ],
    exports: [AppConfigService],
})
export class AppConfigModule {}
