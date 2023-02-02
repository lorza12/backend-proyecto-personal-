import { Request, Response, NextFunction} from 'express';
import { AuthRequest } from '../../auth/auth.types';

import { getAllProducts, getProductsById, deleteProducts, createProducts } from "./product.services";

export async function handleAllGetProducts(req: Request, res: Response, next: NextFunction) {
    try {
        const products = await getAllProducts();
        return res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);

    }
}

export async function handleGetProducts(req: Request, res: Response,  next: NextFunction) {
    const { id } = req.params
    try {
        const products = await getProductsById(id);

        if (!products) {
            return res.status(404).json({message: "user not found"});
        }

        return res.status(200).json(products); 
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);

    }
}


export async function handleCreateProducts(req: AuthRequest, res: Response,  next: NextFunction) {
    const data = req.body;
    const user = req.user;
   try {
    const product = {
        ...data,
        userId: user?._id,
    }
    const newProduct = await createProducts(product);
    
    return res.status(200).json(newProduct);
   } catch (error) {
    console.log(error);
        return res.status(500).json(error);
   }
}



export async function handleDeleteProducts(req: Request, res: Response,  next: NextFunction) {
    const { id } = req.params;
    try {
      await deleteProducts(id)
        return res.status(200).json();
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);

    }
}