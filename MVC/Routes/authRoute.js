import express from 'express'
import { registerUser, userLoginController } from '../Controllers/authContoller.js';

const authrouter = express.Router();


// routers
authrouter.post("/register", registerUser);

//fetch all user
// router.get('/allUser',getAllUser);

// login
authrouter.post("/login", userLoginController);


// export
export default authrouter;