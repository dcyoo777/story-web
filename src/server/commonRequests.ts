import axios from 'axios'
import {camelCase} from "../util/objectUtil";

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

    async getAll(): Promise<any> {
        return dataToCamelCase(await axios.get(this.baseUrl))
    }

    async getOneByPk(pk: any): Promise<any> {
        return dataToCamelCase(await axios.get(this.baseUrl + `/${pk}`));
    }

    async create(item: any): Promise<any> {
        return dataToCamelCase(await axios.post(this.baseUrl, item))
    }

    async update(pk: any, item: any): Promise<any> {
        return dataToCamelCase(await axios.put(this.baseUrl + `/${pk}`, item))
    }

    async delete(pk: any) {
        return await axios.delete(this.baseUrl + `/${pk}`)
    }
}
