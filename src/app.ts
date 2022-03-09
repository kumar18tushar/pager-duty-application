import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';

import { config } from './config/config';
import { DefaultRoutes } from './routes/default.routes';
import { CreateRoutes } from './routes/create.routes';

export default class App {
    private app: Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = Number(config.SERVER_PORT);
        this.registerMiddlewares();
        this.registerRoutes();
    }

    private registerMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(cookieParser());
    }

    private registerRoutes() {
        const createRoutes: CreateRoutes = new CreateRoutes();
        const defaultRoutes: DefaultRoutes = new DefaultRoutes();

        this.app.use('/', createRoutes.router);
        this.app.use('/', defaultRoutes.router);

    }

    public listen() {
        this.app.listen(this.port, () => console.log(`🚀 Server ready at port: ${this.port}`));
    }
}