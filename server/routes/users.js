import express from 'express';

import { verifyToken } from '../middleware/auth.js';
import {
    addRemoveFriend,
    getUser,
    getUserFriends
} from '../controllers/users.js';

const router = express.Router();

/*
    Nếu có admin thì phải thêm 1 middleware nữa để bảo vệ
khi có role = admin thì set bằng true và cho phép vào controller đó
*/

/* READ */
router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

/* UPDATE */
router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;
