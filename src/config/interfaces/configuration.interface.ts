export interface JwtConfig {
    jwtSecret: string
}

export interface PostgresDBConfig {
    dbName: string,
    port: number,
    pwd: string,
    user: string,
    host: string,
}