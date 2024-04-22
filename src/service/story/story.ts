import {CommonRequests} from '../../server/commonRequests'

export type NullString = {
    string: string,
    valid: boolean,
}

export interface StoryFromServer {
    storyId: number
    title: string
    content: NullString
    place: NullString
    start: NullString
    end: NullString
    createdAt: string
    updatedAt: string
}

export interface StoryInterface {
    storyId?: number
    title: string
    content?: string
    place?: string
    start?: string
    end?: string
    createdAt?: string
    updatedAt?: string
}

export class Story implements StoryInterface{

    storyId?: number
    title: string
    content?: string
    place?: string
    start?: string
    end?: string
    createdAt?: string
    updatedAt?: string

    constructor({ storyId, title, content, place, start, end, createdAt, updatedAt }: StoryInterface) {
        this.storyId = storyId
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
                storyId: item.storyId,
                title: item.title,
                content: item.content,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            })
        }
    }

    static parseFromServer(item: StoryFromServer): Story{
        return new Story({
            ...item,
            content: item.content.valid ? item.content.string : undefined,
            place: item.place.valid ? item.place.string : undefined,
            start: item.start.valid ? item.start.string : undefined,
            end: item.end.valid ? item.end.string : undefined,
        })
    }
}

export class StoryReq extends CommonRequests {

    constructor({baseUrl}: {baseUrl: string}) {
        super({baseUrl});
    }

    async getAll(query?: any): Promise<Story[]> {
        const response = await super.getAll(query);
        return response?.data?.result?.map(Story.parseFromServer);
    }

    async getOneByPk(pk: number): Promise<Story> {
        const response = await super.getOneByPk(pk);
        return Story.parseFromServer(response?.data?.result)
    }

    async create(story: Story): Promise<Story> {
        return Story.parseFromServer(await super.create(story))
    }

    async update(story: StoryInterface): Promise<any> {
        return await super.update(story.storyId, (new Story(story)).toUpdate());
    }

}

const domain = process.env.REACT_APP_SERVER_DOMAIN ?? '';

const baseUrl = domain + '/story'

export const storyReq = new StoryReq({baseUrl})
