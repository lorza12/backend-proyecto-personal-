import { Application } from "express";
import user from "./api/user";
import products from "./api/product";
import login from './auth/local';

function routes(app: Application): void {
    app.use('/api/users', user)
    app.use('/api/products', products)
    app.use('/auth/local', login);
}

export default routes;