import express from 'express';

import { login, logout, signup } from '../controllers/auth.js';
import { isLoggedIn } from '../middlewires/auth.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',isLoggedIn,logout);


export default router;