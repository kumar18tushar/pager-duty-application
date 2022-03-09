import Redis from 'ioredis';
import { get, isEmpty } from 'lodash';
import { config } from '../config/config';

// Singleton pattern here.

export class Client {
    private static client: Redis.Redis;
    
    constructor() {
        if (!Client.client) {
            Client.client = new Redis({
                port: config.REDIS_PORT,
                host: config.REDIS_HOST,
            });
        }
    }

    private async get (key) {
        if (key) {
            const data = await Client.client.get(key).catch((e) => {
                console.log(`redis error getting object with key ${key} : ${e}`);
            });
            if (data) {
                return JSON.parse(data);
            }
        }
        return null;
    }

    private async set(key, data) {
        if (key) {
            return await Client.client.set(key, JSON.stringify(data)).catch(error => {
                console.log(`Redis error saving object with key ${key} : ${error}`);
            });
        }
        return null;
    }

    public async getAllValuesInTheTable(table: string): Promise<Array<any>> {
        return await this.get(table) || [];
    }

    public async getValueByKey(table: string, key: string, val: any) {
        const values = await this.getAllValuesInTheTable(table);
        const data = values.filter(value => value[key] === val);
        return get(data, '[0]');
    }

    public async insertValueInTheTable(table: string, data: any) {
        const existingValues = await this.getAllValuesInTheTable(table);
        const allValues =  existingValues || [];
        allValues.push(data);
        await this.set(table, allValues);
    }
}
