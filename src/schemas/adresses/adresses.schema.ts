import * as yup from "yup";

function REQUIRED_MESSAGE(field: string) {
    return `${field}: Campo obrigatório`;
}
function MAX_MESSAGE(charNum: number): string {
    return `Campo precisa ter no máximo ${charNum} caracteres`;
}

const addressSchema = yup.object().shape({
    cep: yup.string().required(REQUIRED_MESSAGE("cep")).max(9, MAX_MESSAGE(9)),
    state: yup
        .string()
        .required(REQUIRED_MESSAGE("state"))
        .max(50, MAX_MESSAGE(50)),
    city: yup
        .string()
        .required(REQUIRED_MESSAGE("city"))
        .max(50, MAX_MESSAGE(50)),
    number: yup
        .string()
        .required(REQUIRED_MESSAGE("number"))
        .max(100, MAX_MESSAGE(100)),
    complement: yup
        .string()
        .required(REQUIRED_MESSAGE("complement"))
        .max(10, MAX_MESSAGE(10)),
});

export default addressSchema;
