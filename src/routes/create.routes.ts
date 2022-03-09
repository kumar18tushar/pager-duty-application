import { NextFunction, Router } from "express";
import { CreateController } from "../controllers/create.controller";

export class CreateRoutes {
    private _router = Router();
    private path = '';
    private createController;

	constructor() {
        this.createController = new CreateController();
        this.initializeRoutes();
	}

    public initializeRoutes() {
        this.router.post(`${this.path}/create-developer`, (req, res, next) => this.createController.createDeveloper(req, res, next));
        this.router.post(`${this.path}/create-team`, (req, res, next) => this.createController.createTeam());
    }

    public get router(): Router {
        return this._router;
    }
}