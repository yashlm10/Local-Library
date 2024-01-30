import express from "express"
import { registerController } from "../controllers/authController.js";
import { loginController, testController } from "../controllers/authController.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router()

//routing
//REGISTER || METHOD POST
router.post('/register', registerController)

//LOGIN || METHOD POST
router.post('/login', loginController);

//TEST ROUTE
router.post('/test', requireSignin, isAdmin, testController);
export default router;