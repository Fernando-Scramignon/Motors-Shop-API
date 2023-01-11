import { User } from "../../entities/users.entity";

export interface IAddressBase {
    cep: string;
    state: string;
    city: string;
    street: string;
    number: string;
    complement: string;
    user?: User;
}
