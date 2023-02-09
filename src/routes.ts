import { Application } from "express";
import user from "./api/user";
import products from "./api/product";
import login from './auth/local';
import payment from './api/payment';
import upLoad from './api/upLoad';

function routes(app: Application): void {
    app.use('/api/users', user)
    app.use('/api/products', products)
    app.use('/auth/local', login);
    app.use('/api/payment', payment);
    app.use('/api/upLoad', upLoad);
}

export default routes;