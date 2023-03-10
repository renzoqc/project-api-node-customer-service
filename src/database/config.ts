import { registerAs } from '@nestjs/config'
import { AppConfigService } from '../config/providers/configuration.service'

export default registerAs('config', () => {
    return {
        postgres: new AppConfigService().postgresDB,
    }
})
