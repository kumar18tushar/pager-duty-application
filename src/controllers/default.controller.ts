import { Request, Response } from 'express';

export class DefaultController {
    // private defaultService = new DefaultService()

    constructor() {}

    public handleHealthCheckroute(req: Request, res: Response) {    
        res.status(200).send("Sever is running");
    }

    public handleInvalidRoutes(req: Request, res: Response) {
        res.status(500).send("Route not found!");
        return;
    }
}