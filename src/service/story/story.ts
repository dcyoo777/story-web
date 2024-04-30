import {CommonRequests} from '../../server/commonRequests'
import _ from "lodash";

export interface StoryFromServer {
    storyId: number
    title: string
    content: string
    place: string
    start: string
    end: string
    createdAt: string
    updatedAt: string
}

export interface StoryInterface {
    id?: string
    title: string
    content?: string
    place?: string
    start?: string
    end?: string
    createdAt?: string
    updatedAt?: string
}

export class Story implements StoryInterface{

    id?: string
    title: string
    content?: string
    place?: string
    start?: string
    end?: string
    createdAt?: string
    updatedAt?: string

    constructor({ id, title, content, place, start, end, createdAt, updatedAt }: StoryInterface) {
        this.id = id
        this.title = title
        this.content = content
        this.place = place
        this.start = start
        this.end = end
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    toUpdate() {
        return {
            title: this.title,
            content: this.content,
            place: this.place,
            start: this.start,
            end: this.end,
        }
    }

    static makeStory(item: StoryInterface) {
        const isValid = item?.title && item?.content;

        if (isValid) {
            return new Story({
                id: item.id,
                title: item.title,
                content: item.content,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            })
        }
    }

    static parseFromServer(item: StoryFromServer): Story{
        return new Story({...item})
    }
}

export class StoryReq extends CommonRequests {

    constructor({baseUrl}: {baseUrl: string}) {
        super({baseUrl});
    }

    async getAll(query?: any): Promise<Story[]> {
        const response = await super.getAll(query);
        return _.sortBy(response?.data?.result?.map(Story.parseFromServer), "start");
    }

    async getOneByPk(pk: number): Promise<Story> {
        const response = await super.getOneByPk(pk);
        return Story.parseFromServer(response?.data?.result)
    }

    async create(story: Story): Promise<any> {
        return await super.create(story)
    }

    async update(story: StoryInterface): Promise<any> {
        return await super.update(story.id, (new Story(story)).toUpdate());
    }

}

const domain = process.env.REACT_APP_SERVER_DOMAIN ?? '';

const baseUrl = domain + '/story'

export const storyReq = new StoryReq({baseUrl})
