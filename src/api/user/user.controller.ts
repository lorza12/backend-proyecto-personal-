import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

import {
  getAllusers,
  getUserById,
  deleteUser,
  createUser,
  updateUser
} from './user.services';
import { AuthRequest } from '../../auth/auth.types';

export async function handleAllGetUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getAllusers();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function handleGetUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'user not found' });
    }

    return res.status(200).json(user.profile);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function handleCreateUser(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  try {
    const newUser = await createUser(data);

    return res.status(200).json(newUser);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
}
export async function handleUpdateUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = req.body;
  console.log(data);

  const cart = await updateUser(id, data);

  if (!cart) {
    return res.status(404).json({ message: 'list not found' });
  }

  return res.status(200).json(cart);
}

export async function handleGetMe(req: AuthRequest, res: Response, next: NextFunction) {
  const id = req.user?._id;

  try {
    const user = await getUserById(id);
    // TODO: Search all info about user

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch(error) {
    console.error(error)
    return res.status(500).json(error);
  }
}

export async function handleDeleteUser(req: Request, res: Response, next: NextFunction
) {
  const { id } = req.params;
  try {
    await deleteUser(id);
    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}
