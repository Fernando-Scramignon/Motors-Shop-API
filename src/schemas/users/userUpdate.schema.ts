import * as yup from "yup";

function MAX_MESSAGE(charNum: number): string {
    return `Campo precisa ter no máxio ${charNum} caracteres`;
}

const userUpdateSchema = yup.object().shape({
    name: yup.string().max(100, MAX_MESSAGE(100)),
    email: yup.string().max(100, MAX_MESSAGE(100)),
    cpf: yup.string().max(14, MAX_MESSAGE(14)),
    phone: yup.string().max(14, MAX_MESSAGE(14)),
    birthdate: yup.date(),
    description: yup.string().max(300, MAX_MESSAGE(300)),
  
});

export default userUpdateSchema;
