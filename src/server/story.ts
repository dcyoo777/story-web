import {CommonRequests} from './commonRequests'

export class Story {

    storyId: number
    title: string
    content: string
    createdAt?: string
    updatedAt?: string

    constructor({ storyId, title, content, createdAt, updatedAt }: {
        storyId: number,
        title: string,
        content: string,
        createdAt?: string,
        updatedAt?: string,
    }) {
        this.storyId = storyId
        this.title = title
        this.content = content
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    static makeStory(item: any) {
        const isValid = item?.storyId && item?.title && item?.content;

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
        return (await super.getAll()).map(item => new Story(item))
    }

    async getOneByPk(pk: number): Promise<Story> {
        return new Story(await super.getOneByPk(pk))
    }

    async create(story: Story): Promise<Story> {
        return new Story(await super.create(story))
    }

    async update(story: Story): Promise<Story> {
        return new Story(await super.update(story.storyId, story))
    }

}

export const storyReq = new StoryReq({baseUrl: 'http://localhost:8080/story'})
