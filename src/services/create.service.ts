import { Client } from '../database';
import { Developer } from '../modals/developer';
import { DeveloperResponseObj, TeamResponseObj } from '../modals/response';
import { config } from '../config/config';
import { Team } from '../modals/team';

export class CreateService {
    private client: Client = new Client();

    public async saveDeveloper(developer: Developer): Promise<DeveloperResponseObj> {    
        const developerRespObj: DeveloperResponseObj = developer.getDeveloperResponseObject();
        try {
            await this.client.insertValueInTheTable(config.TABLES.DEVLEOPERS, developerRespObj);
            return developerRespObj;
        } catch(e) {
            return null;
        }
    }

    public async saveTeam(team: Team): Promise<TeamResponseObj> {    
        const teamResponseObj: TeamResponseObj = team.getTeamResponseObject();

        for(const developer_id of teamResponseObj.developers) {
            const isInDb = await this.client.getValueByKey(config.TABLES.DEVLEOPERS, 'id', developer_id);
            if(!isInDb) {
                console.log(`Developer not in DB: ${developer_id}`);
                return null;
            }
        }
        try {
            await this.client.insertValueInTheTable(config.TABLES.TEAMS, teamResponseObj);
            return teamResponseObj;
        } catch(e) {
            return null;
        }
    }
}