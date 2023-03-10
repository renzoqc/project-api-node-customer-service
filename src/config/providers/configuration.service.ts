import { Injectable } from '@nestjs/common'
import { JwtConfig, PostgresDBConfig } from '../interfaces/configuration.interface'

@Injectable()
export class AppConfigService {
    get jsonWebToken(): JwtConfig {
        return {
            jwtSecret: process.env.JWT_SECRET,
        }
    }

    get postgresDB(): PostgresDBConfig {
        return {
            dbName: process.env.POSTGRES_DB,
            port: parseInt(process.env.POSTGRES_PORT, 10),
            pwd: process.env.POSTGRES_PASSWORD,
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
        }
    }
}
