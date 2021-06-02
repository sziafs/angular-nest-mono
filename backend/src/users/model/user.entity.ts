import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    phone: string

    @Column()
    password: string
}

export default UserEntity