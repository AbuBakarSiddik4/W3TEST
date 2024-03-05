
import express from 'express';

import { isLoggedIn } from '../middlewires/auth.js';
import { findUserTransaction,makeAdmin } from '../controllers/user.js';

const router = express.Router();

router.get('/',isLoggedIn,findUserTransaction);
router.patch('/',isLoggedIn,makeAdmin);

export default router;