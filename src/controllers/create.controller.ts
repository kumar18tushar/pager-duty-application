import { get, isEmpty } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { Validator } from '../utils/validator';
import { Developer } from '../modals/developer';
import { CreateService } from '../services/create.service';
import { Team } from '../modals/team';

export class CreateController {
    private createService: CreateService;

    constructor() {
        this.createService = new CreateService();
    }

    public async createDeveloper(req: Request, res: Response, next: NextFunction) {
        const body = get(req, 'body');

        if (isEmpty(body)) {
            res.status(400).send("Request body not found");
        }

        const name: string = get(body, 'name');
        const phone_number: string = get(body, 'phone_number');
        const developer: Developer = new Developer(name, phone_number);

        if (!Validator.validateDeveloper(developer)) {
            res.status(400).send("Invalid request");
        }

        const resp = await this.createService.saveDeveloper(developer);
        if (!resp) {
            res.status(500).send("Internal server error");
            return;
        }
        res.status(200).send(developer.getDeveloperResponseObject());
    }


    public async createTeam(req: Request, res: Response, next: NextFunction) {
        const body = get(req, 'body');

        if (isEmpty(body)) {
            res.status(400).send("Request body not found");
        }
        const name: string = get(body, 'name');
        const developers: Array<string> = get(body, 'developers');

        const team: Team = new Team(name, developers);

        if (!Validator.validateTeam(team)) {
            res.status(400).send("Invalid request");
        }
        const resp = await this.createService.saveTeam(team);

        if (!resp) {
            res.status(500).send("Internal server error");
        }
        res.status(200).send(team.getTeamResponseObject());
    }
}