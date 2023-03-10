import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number

    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'varchar', length: 255 })
    mail: string

    @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
    token: string
}
