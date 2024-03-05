import express from 'express';

import { login, logout, signup,google } from '../controllers/auth.js';
import { isLoggedIn } from '../middlewires/auth.js';

const router = express.Router();

router.post('/google',google);
router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',isLoggedIn,logout);


export default router;