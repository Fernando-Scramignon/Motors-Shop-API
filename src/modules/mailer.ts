import nodemailer from "nodemailer";
import "dotenv/config";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: Number(process.env.NODEMAILER_PORT!),
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
});

export default transport;
