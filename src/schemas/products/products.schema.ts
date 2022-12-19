import * as yup from "yup";

function isValidUrl(url: string) {
    try {
        new URL(url);
    } catch (e) {
        return false;
    }
    return true;
}

const productSchema = yup.object().shape({
    title: yup.string().required(),
    year: yup.number().required(),
    km: yup.number().required(),
    price: yup.number().required(),
    description: yup.string().required(),
    vehicle_type: yup.string().required(),
    announcement_type: yup.string().required(),
    published: yup.boolean().required(),
    cover_image: yup
        .string()
        .required()
        .test("is-url-valid", "URL is not valid", (value) =>
            isValidUrl(value as string)
        ),

    images: yup
        .array()
        .of(
            yup
                .string()
                .required()
                .test("is-url-valid", "URL is not valid", (value) =>
                    isValidUrl(value as string)
                )
        )
        .required(),
});

export default productSchema;
