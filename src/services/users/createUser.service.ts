import { AppDataSource } from "../../data-source";
import { IUserBase, IUserCreation } from "../../interfaces/users";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import { hash } from "bcryptjs";
import { instanceToPlain } from "class-transformer";
import { IAddressBase } from "../../interfaces/address";
import { Address } from "../../entities/addresses.entity";

export async function createUserService(userFullInfo: IUserCreation) {
    const addressInfo: IAddressBase = {
        cep: userFullInfo.cep,
        city: userFullInfo.city,
        complement: userFullInfo.complement,
        number: userFullInfo.number,
        state: userFullInfo.state,
        street: userFullInfo.street,
    };
    const userInfo: IUserBase = {
        name: userFullInfo.name,
        description: userFullInfo.description,
        cpf: userFullInfo.cpf,
        email: userFullInfo.email,
        birthdate: userFullInfo.birthdate,
        password: userFullInfo.password,
        isAdvertiser: userFullInfo.isAdvertiser,
        phone: userFullInfo.phone,
    };

    const userRepository = AppDataSource.getRepository(User);
    const addressRepository = AppDataSource.getRepository(Address);

    const userAlreadyExists = await userRepository.findOne({
        where: [{ email: userInfo.email }, { cpf: userInfo.cpf }],
    });

    if (userAlreadyExists) throw new AppError(409, "User already exists");

    const hashedPassword = await hash(userInfo.password, 10);
    userInfo.password = hashedPassword;

    let newUser = userRepository.create(userInfo);
    let newAddress = addressRepository.create(addressInfo);

    newUser = await userRepository.save(newUser);
    newAddress = await addressRepository.save(newAddress);

    newUser.address = newAddress;
    return instanceToPlain(await userRepository.save(newUser));
}

export default createUserService;
