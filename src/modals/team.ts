import { Helper } from '../utils/helper';
import { TeamResponseObj } from './response';

export class Team {
    private _id: string;
    private _name: string;
    private _developers: Array<string>;

	constructor(name: string, developers: Array<string>) {
		this._id = Helper.generate_id(); 
		this._name = name;
        this._developers = developers;
	}

    public getTeamResponseObject(): TeamResponseObj {
        return {
            id: this._id,
            name: this._name,
            developers: this.developers
        }
    }

    /**
     * Getter id
     * @return {string}
     */
	public get id(): string {
		return this._id;
	}

    /**
     * Getter name
     * @return {string}
     */
	public get name(): string {
		return this._name;
	}

    /**
     * Getter developers
     * @return {Array<string>}
     */
	public get developers(): Array<string> {
		return this._developers;
	}
}