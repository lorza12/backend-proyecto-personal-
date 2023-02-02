import { Application } from "express";
import user from "./api/user";

function routes(app: Application): void {
    app.use('/api/users', user)
}

export default routes;