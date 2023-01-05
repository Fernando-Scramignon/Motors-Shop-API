import {
    Entity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./users.entity";
import { Product } from "./products.entity";

@Entity("comments")
export class Comment {
    @PrimaryColumn("uuid")
    readonly id: string;

    @Column({ length: 256 })
    comment: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User, (User) => User.comments, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Product, (Product) => Product.comments, {
        onDelete: "CASCADE",
    })
    product: Product;

    constructor() {
        if (!this.id) this.id = uuid();
    }
}
