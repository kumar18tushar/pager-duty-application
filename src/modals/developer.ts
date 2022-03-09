import { DeveloperResponseObj } from "./response";

export  class Developer {
    private _id: string;
    private _name: string;
    private _phone_number: string;

	constructor(name: string, phone_number: string) {
		this._id = phone_number;
		this._name = name;
        this._phone_number = phone_number;
	}

    public getDeveloperResponseObject(): DeveloperResponseObj {
        return {
            id: this._id,
            name: this._name,
            phone_number: this._phone_number
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
     * Getter phone_number
     * @return {string}
     */
	public get phone_number(): string {
		return this._phone_number;
	}
}