import express from "express";
import {registerController,loginController,testController,forgotPasswordController} from '../controllers/authController.js'
import { requireSignIn ,isAdmin} from "../middlewares/authMiddleware.js";
import { updateProfileController } from "../controllers/authController.js";
import { getOrdersController } from "../controllers/authController.js";
import { getAllOrdersController } from "../controllers/authController.js";
import { orderStatusController } from "../controllers/authController.js";

//router object
const router = express.Router()

//routing
//REGISTER || METHOD POST
router.post('/register',registerController)

//LOGIN || POST
router.post('/login',loginController)

//Forgot Password || POST
router.post("/forgot-password", forgotPasswordController);

//test Routes
router.get('/test',requireSignIn,isAdmin,testController)

//protected route User auth
router.get("/user-auth",requireSignIn, (req,res)=>{
    res.status(200).send({ok:true})
})

//protected route Admin auth
router.get("/admin-auth",requireSignIn,isAdmin ,(req,res)=>{
    res.status(200).send({ok:true})
})

//update profile
router.put('/profile',requireSignIn,updateProfileController)

//orders
router.get('/orders',requireSignIn,getOrdersController)

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);
export default router