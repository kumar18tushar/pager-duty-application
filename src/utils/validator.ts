import { isEmpty } from "lodash";
import { Developer } from "../modals/developer";
import { Team } from "../modals/team";

export class Validator {
    public static  validateDeveloper(developer: Developer) {
        if(developer && developer.name && developer.phone_number) {
            return true;
        }
        return false;
    }

    public static validateTeam(team: Team) {
        if(team && team.name && !isEmpty(team.developers)) {
            return true;
        }
        return false;
    }
}