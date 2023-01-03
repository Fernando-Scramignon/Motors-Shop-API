import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Address } from "./addresses.entity";

@Entity("users")
export class User {
    @PrimaryColumn()
    readonly id: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 256 })
    password: string;

    @Column({ length: 100 })
    name: string;

    @Column({ length: 14, unique: true })
    cpf: string;

    @Column({ length: 14 })
    phone: string;

    @Column({ type: "date" })
    birthdate: Date;

    @Column({ length: 300 })
    description: string;

    @Column({ type: "boolean" })
    isAdvertiser: boolean;

    @OneToOne(() => Address, (address) => address.user)
    address: Address;

    constructor() {
        if (!this.id) this.id = uuid();
    }
}
