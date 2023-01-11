export interface IUserUpdate {
    name?: string;
    email?: string;
    cpf?: string;
    phone?: string;
    birthdate?: Date;
    description?: string;
    password?: string;
}

export interface IUserCreation {
    name: string;
    email: string;
    password: string;
    cpf: string;
    phone: string;
    birthdate: Date;
    description: string;
    isAdvertiser: boolean;
}

export interface IUserLogin {
    email: string;
    password: string;
}
