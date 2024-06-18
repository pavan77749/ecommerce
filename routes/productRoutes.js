import express from "express";
import { isAdmin,requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController } from "../controllers/productController.js";
import formidable from 'express-formidable';
import { getProductController } from "../controllers/productController.js";
import { singleProductController } from "../controllers/productController.js";
import { productPhotoController } from "../controllers/productController.js";
import { deleteProductController } from "../controllers/productController.js";
import { updateProductController } from "../controllers/productController.js";
import { productFiltersController } from "../controllers/productController.js";
import { productCountController } from "../controllers/productController.js";
import { productListController } from "../controllers/productController.js";
import { searchProductController } from "../controllers/productController.js";
import { relatedProductController } from "../controllers/productController.js";
import { productCategoryController } from "../controllers/productController.js";

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

//filter-product
router.post("/product-filters", productFiltersController)

//product-count
router.get("/product-count", productCountController)

// product per page
router.get("/product-list/:page",productListController)

// search product
router.get('/search/:keyword', searchProductController)

//similar product
router.get('/related-product/:pid/:cid',relatedProductController)

//category wise Product
router.get('/product-category/:slug',productCategoryController)

export default router