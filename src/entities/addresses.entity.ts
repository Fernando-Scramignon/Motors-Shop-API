import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./users.entity";

@Entity("addresses")
export class Address {
    @PrimaryColumn()
    readonly id: string;

    @Column({ length: 9 })
    cep: string;

    @Column({ length: 50 })
    state: string;

    @Column({ length: 50 })
    city: string;

    @Column({ length: 100 })
    street: string;

    @Column({ length: 10 })
    number: string;

    @Column()
    complement: string;

    @OneToOne(() => User, (user) => user.address, { onDelete: "CASCADE" })
    @JoinColumn()
    user: User;

    constructor() {
        if (!this.id) this.id = uuid();
    }
}
