import express from 'express';

import { addnewone, remove } from '../controllers/transaction.js';
import { isLoggedIn } from '../middlewires/auth.js';

const router = express.Router();

router.post('/add',isLoggedIn,addnewone);
router.delete("/remove",isLoggedIn,remove);

export default router;