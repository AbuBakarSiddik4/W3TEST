
import express from 'express';

import { users } from '../controllers/admin.js';
import { isAdmin,isLoggedIn } from '../middlewires/auth.js';

const router = express.Router();

router.get('/',isLoggedIn,isAdmin,users);

export default router;
