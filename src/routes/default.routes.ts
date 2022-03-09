import { Router } from "express";
import { DefaultController } from "../controllers/default.controller";

export class DefaultRoutes {
    private _router = Router();
    private path = '';
    private defaultController = new DefaultController();

	constructor() {
        this.initializeRoutes();
	}

    public initializeRoutes() {
        this.router.get(`${this.path}/health-check`, this.defaultController.handleHealthCheckroute.bind(this));
        this.router.get(`${this.path}/*`, this.defaultController.handleInvalidRoutes.bind(this));
    }

    public get router(): Router {
        return this._router;
    }
}