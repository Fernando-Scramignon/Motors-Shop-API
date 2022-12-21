import { Router } from "express";
import createProductController from "../controllers/products/createProduct.controller";
import deleteProductController from "../controllers/products/deleteProduct.controller";
import getProductByIdController from "../controllers/products/getProductById.controller";
import getProductsController from "../controllers/products/getProducts.controller";
import yupValidateMiddleware from "../middlewares/yupValidate.middleware";
import productSchema from "../schemas/products/products.schema";

const productsRouter = Router();

productsRouter.post(
    "",
    yupValidateMiddleware(productSchema),
    createProductController
);

productsRouter.get("", getProductsController);

productsRouter.get("/:id", getProductByIdController);

productsRouter.delete("/:id", deleteProductController);

export default productsRouter;
