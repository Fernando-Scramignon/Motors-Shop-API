import * as yup from "yup";

function isValidUrl(url: string) {
    try {
        new URL(url);
    } catch (e) {
        return false;
    }
    return true;
}

function vehicleType(type: string) {
    return type == "Carro" || type == "Moto" ? true : false;
}

function announcementType(type: string) {
    return type == "Venda" || type == "Leilão" ? true : false;
}

const productSchema = yup.object().shape({
    title: yup.string().required(),
    year: yup.number().required().positive().integer(),
    km: yup.number().required().positive(),
    price: yup.number().required().positive().integer(),
    description: yup.string().required(),
    vehicle_type: yup
        .string()
        .required()
        .test(
            "É um tipo de veículo válido",
            "Não é um tipo de veículo válido",
            (value) => vehicleType(value as string)
        ),
    announcement_type: yup
        .string()
        .required()
        .test(
            "É um tipo de anúncio válido",
            "Não é um tipo de anúncio válido",
            (value) => announcementType(value as string)
        ),
    published: yup.boolean().required(),
    cover_image: yup
        .string()
        .required()
        .test("É uma url válida", "Não é uma url válida", (value) =>
            isValidUrl(value as string)
        ),

    images: yup
        .array()
        .of(
            yup
                .string()
                .required()
                .test("É uma url válida", "Não é uma url válida", (value) =>
                    isValidUrl(value as string)
                )
        )
        .required(),
});

export default productSchema;
