import { AppDataSource } from "../../data-source";
import { Address } from "../../entities/addresses.entity";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appError";
import { IAddressUpdate } from "../../interfaces/address";
import { IUserUpdate } from "../../interfaces/users";

async function updateUserService(
    id: string,
    { name, email, cpf, phone, birthdate, description, password }: IUserUpdate,
    { cep, state, city, street, number, complement }: IAddressUpdate
) {
    const userRepository = AppDataSource.getRepository(User);
    const addresRepository = AppDataSource.getRepository(Address);

    if (
        !name &&
        !email &&
        !cpf &&
        !phone &&
        !birthdate &&
        !description &&
        !password &&
        !cep &&
        !state &&
        !city &&
        !street &&
        !number &&
        !complement
    ) {
        throw new AppError(
            400,
            "Adicione um campo, pelo menos um campo é obrigatório"
        );
    }
    const userupdate = await userRepository.findOne({
        where: {
            id: id,
        },
    });

    if (!userupdate) {
        throw new AppError(404, "Usuário não encontrado");
    }
    const addressupdate = await addresRepository.findOne({
        where: {
            user: userupdate,
        },
    });

    if (!addressupdate) {
        throw new AppError(404, "Informações de endereço não encontrado");
    }

    if (email) {
        const userEmailInUse = await userRepository.findOne({
            where: { email: email },
        });
        if (userEmailInUse) {
            throw new AppError(400, "Email já está em uso");
        }
    }

    if (cpf) {
        const userCpfInUse = await userRepository.findOne({
            where: { cpf: cpf },
        });

        if (userCpfInUse) {
            throw new AppError(400, "CPF já está em uso");
        }
    }

    const updatedUser = {
        name: name || userupdate.name,
        email: email || userupdate.email,
        cpf: cpf || userupdate.cpf,
        phone: phone || userupdate.phone,
        birthdate: birthdate || userupdate.birthdate,
        description: description || userupdate.description,
        password: password || userupdate.password,
    };

    const updatedAddres = {
        cep: cep || addressupdate.cep,
        city: city || addressupdate.city,
        complement: complement || addressupdate.complement,
        number: number || addressupdate.number,
        state: state || addressupdate.state,
        street: street || addressupdate.street,
    };

    await userRepository.update(userupdate.id, updatedUser);
    await addresRepository.update(addressupdate.id, updatedAddres);

    return true;
}

export default updateUserService;
