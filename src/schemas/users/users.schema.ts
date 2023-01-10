import * as yup from "yup";

function REQUIRED_MESSAGE(field: string) {
    return `${field}: campo obrigatório`;
}
function MAX_MESSAGE(charNum: number, field: string): string {
    return `${field}: precisa ter no máximo ${charNum} caracteres`;
}

const usersSchema = yup.object().shape({
    name: yup
        .string()
        .required(REQUIRED_MESSAGE("name"))
        .max(100, MAX_MESSAGE(100, "name")),
    email: yup
        .string()
        .email("O email deve ser válido")
        .required(REQUIRED_MESSAGE("email"))
        .max(100, MAX_MESSAGE(100, "email")),
    password: yup
        .string()
        .required(REQUIRED_MESSAGE("password"))
        .max(256, MAX_MESSAGE(256, "password")),
    cpf: yup
        .string()
        .required(REQUIRED_MESSAGE("cpf"))
        .max(14, MAX_MESSAGE(14, "cpf")),
    phone: yup
        .string()
        .required(REQUIRED_MESSAGE("phone"))
        .max(14, MAX_MESSAGE(14, "phone")),
    birthdate: yup.date().required(REQUIRED_MESSAGE("birthdate")),
    description: yup
        .string()
        .required(REQUIRED_MESSAGE("description"))
        .max(300, MAX_MESSAGE(300, "description")),
    isAdvertiser: yup.boolean().required(REQUIRED_MESSAGE("isAdvertiser")),
    cep: yup
        .string()
        .required(REQUIRED_MESSAGE("cep"))
        .max(9, MAX_MESSAGE(9, "cep")),
    state: yup
        .string()
        .required(REQUIRED_MESSAGE("state"))
        .max(50, MAX_MESSAGE(50, "state")),
    city: yup
        .string()
        .required(REQUIRED_MESSAGE("city"))
        .max(50, MAX_MESSAGE(50, "city")),
    number: yup
        .string()
        .required(REQUIRED_MESSAGE("number"))
        .max(100, MAX_MESSAGE(100, "number")),
    street: yup
        .string()
        .required(REQUIRED_MESSAGE("street"))
        .max(100, MAX_MESSAGE(100, "street")),
    complement: yup
        .string()
        .required(REQUIRED_MESSAGE("complement"))
        .max(10, MAX_MESSAGE(10, "complement")),
});

export default usersSchema;
