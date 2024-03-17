import axios from 'axios'

export class CommonRequests {
    baseUrl: string
    constructor({
        baseUrl
    }: {
        baseUrl: string
    }) {
        this.baseUrl = baseUrl
    }

    async getAll(): Promise<any[]> {
        return await axios.get(this.baseUrl)
    }

    async getOneByPk(pk: any): Promise<any> {
        return await axios.get(this.baseUrl + `/${pk}`)
    }

    async create(item: any): Promise<any> {
        return await axios.post(this.baseUrl + `/create`, item)
    }

    async update(pk: any, item: any): Promise<any> {
        return await axios.put(this.baseUrl + `/${pk}/update`, item)
    }

    async delete(pk: any) {
        return await axios.delete(this.baseUrl + `/${pk}`)
    }
}
