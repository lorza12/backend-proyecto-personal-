import { Router } from 'express';
import { isAuthenticated, hasRole } from '../../auth/auth.services';


import {
    handleAllGetProducts,
    handleGetProducts,
    handleCreateProducts,
    handleDeleteProducts,

} from './product.controller';

const router = Router();
// RESTful API

// GET /api/users
router.get('/',isAuthenticated,hasRole(['ADMIN']), handleAllGetProducts);
// GET /api/users/:id
router.get('/:id',isAuthenticated,hasRole(['ADMIN']), handleGetProducts);
// POST /api/users
router.post('/',isAuthenticated,hasRole(['ADMIN']), handleCreateProducts);
// PATCH /api/users/:id

// DELETE /api/users/:id
router.delete('/:id', isAuthenticated, hasRole(['ADMIN']), handleDeleteProducts);


export default router;