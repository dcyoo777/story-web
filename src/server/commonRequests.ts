import axios from 'axios'
import {camelCase} from "../util/objectUtil";
import qs from 'qs'

const dataToCamelCase = (response: any) => {
    return {
        ...response,
        data: {
            ...camelCase(response.data),
        }
    }
}

export class CommonRequests {
    baseUrl: string
    constructor({
        baseUrl
    }: {
        baseUrl: string
    }) {
        this.baseUrl = baseUrl
    }

    async getAll(query?: any): Promise<any> {
        try {
            return dataToCamelCase(await axios.get(this.baseUrl + qs.stringify(query, {
                addQueryPrefix: true,
                arrayFormat: 'brackets',
            })))
            // return dataToCamelCase(await axios.get(this.baseUrl))
        } catch (e) {
            throw e;
        }
    }

    async getOneByPk(pk: any): Promise<any> {
        try {
            return dataToCamelCase(await axios.get(this.baseUrl + `/${pk}`));
        } catch (e) {
            throw e;
        }
    }

    async create(item: any): Promise<any> {
        try {
            return dataToCamelCase(await axios.post(this.baseUrl, item))
        } catch (e) {
            throw e;
        }
    }

    async update(pk: any, item: any): Promise<any> {
        try {
            return dataToCamelCase(await axios.put(this.baseUrl + `/${pk}`, item));
        } catch (e) {
            throw e;
        }
    }

    async delete(pk: any) {
        try {
            return await axios.delete(this.baseUrl + `/${pk}`)
        } catch (e) {
            throw e;
        }
    }
}
