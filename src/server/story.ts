import {CommonRequests} from './commonRequests'

export interface StoryInterface {
    storyId?: number
    title: string
    content: string
    createdAt?: string
    updatedAt?: string
}

export class Story implements StoryInterface{

    storyId?: number
    title: string
    content: string
    createdAt?: string
    updatedAt?: string

    constructor({ storyId, title, content, createdAt, updatedAt }: StoryInterface) {
        this.storyId = storyId
        this.title = title
        this.content = content
        this.createdAt = createdAt
        this.updatedAt = updatedAt
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
}

export class StoryReq extends CommonRequests {

    constructor({baseUrl}: {baseUrl: string}) {
        super({baseUrl});
    }

    async getAll(): Promise<Story[]> {
        const response = await super.getAll();
        return response?.data?.result?.map((item: any) => new Story(item));
    }

    async getOneByPk(pk: number): Promise<Story> {
        const response = await super.getOneByPk(pk);
        return new Story(response?.data?.result)
    }

    async create(story: Story): Promise<Story> {
        return new Story(await super.create(story))
    }

    async update(story: Story): Promise<Story> {
        return new Story(await super.update(story.storyId, story))
    }

}

const domain = process.env.REACT_APP_SERVER_DOMAIN ?? '';

const baseUrl = domain + '/story'

export const storyReq = new StoryReq({baseUrl})
