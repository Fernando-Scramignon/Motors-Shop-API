import * as yup from "yup";

function MAX_MESSAGE(charNum: number, field: string): string {
    return `${field}: precisa ter no máximo ${charNum} caracteres`;
}

const userUpdateSchema = yup.object().shape({
    name: yup.string().max(100, MAX_MESSAGE(100, "name")),
    email: yup
        .string()
        .email("O email deve ser válido")
        .max(100, MAX_MESSAGE(100, "email")),
    password: yup.string().max(256, MAX_MESSAGE(256, "password")),
    cpf: yup.string().max(14, MAX_MESSAGE(14, "cpf")),
    phone: yup.string().max(14, MAX_MESSAGE(14, "phone")),
    birthdate: yup.date(),
    description: yup.string().max(300, MAX_MESSAGE(300, "description")),
    address: yup.object({
        cep: yup
            .string()
            .max(9, MAX_MESSAGE(9, "cep"))
            .matches(/^[0-9]+$/, "cep: precisa conter apenas números"),
        state: yup.string().max(50, MAX_MESSAGE(50, "state")),
        city: yup.string().max(50, MAX_MESSAGE(50, "city")),
        number: yup
            .string()
            .max(10, MAX_MESSAGE(10, "number"))
            .matches(/^[0-9]+$/, "number: precisa conter apenas números"),
        street: yup.string().max(100, MAX_MESSAGE(100, "street")),
        complement: yup.string().max(10, MAX_MESSAGE(10, "complement")),
    }),
});

export default userUpdateSchema;
