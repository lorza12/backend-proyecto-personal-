import { Router } from 'express';
import { hasRole, isAuthenticated } from '../../auth/auth.services';



import {
    handleAllGetUsers,
    handleGetMe,
    handleDeleteUser,
    handleCreateUser,
    handleUpdateUser,

} from './user.controller';

const router = Router();
// RESTful API

// GET /api/users
router.get('/', handleAllGetUsers);
// GET /api/users/:id
router.get('/:id', isAuthenticated, hasRole(['USER','ADMIN']), handleGetMe);
// POST /api/users
router.post('/', handleCreateUser);
// PATCH /api/users/:id
router.patch('/edit/:id',isAuthenticated,handleUpdateUser);
// DELETE /api/users/:id
router.delete('/:id',isAuthenticated, handleDeleteUser);


export default router;