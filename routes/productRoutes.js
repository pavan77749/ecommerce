import express from "express";
import { isAdmin,requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController } from "../controllers/productController.js";
import formidable from 'express-formidable';
import { getProductController } from "../controllers/productController.js";
import { singleProductController } from "../controllers/productController.js";
import { productPhotoController } from "../controllers/productController.js";
import { deleteProductController } from "../controllers/productController.js";
import { updateProductController } from "../controllers/productController.js";

//router object
const router = express.Router()

//routes
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
  );

  //get products
  router.get('/get-product',getProductController)

//single-product
router.get('/get-product/:slug',singleProductController)

//get photo
router.get('/product-photo/:pid',productPhotoController)

//delete product
router.delete('/delete-product/:pid',deleteProductController)

//updateProduct
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

export default router