import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Image } from "./images.entity";
import { User } from "./users.entity";

@Entity("products")
export class Product {
    @PrimaryColumn("uuid")
    readonly id: string;

    @Column({ length: 100 })
    title: string;

    @Column({ type: "integer" })
    year: number;

    @Column()
    km: number;

    @Column({ type: "integer" })
    price: number;

    @Column({ length: 256 })
    description: string;

    @Column()
    vehicle_type: string;

    @Column()
    announcement_type: string;

    @Column({ default: false })
    published: boolean;

    @Column()
    cover_image: string;

    @OneToMany(() => Image, (image: Image) => image.product, {
        eager: true,
        onDelete: "CASCADE",
    })
    images: Image[];

    @ManyToOne(() => User, (user) => user.products, { onDelete: "CASCADE" })
    user: User;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
