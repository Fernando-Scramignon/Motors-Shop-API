import { Router } from "express";
import createProductController from "../controllers/products/createProduct.controller";
import yupValidateMiddleware from "../middlewares/yupValidate.middleware";
import productSchema from "../schemas/products/products.schema";

const productsRouter = Router();

productsRouter.post(
    "",
    yupValidateMiddleware(productSchema),
    createProductController
);

export default productsRouter;
