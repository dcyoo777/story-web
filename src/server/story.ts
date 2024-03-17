import {CommonRequests} from './commonRequests'

class Story {

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
}

class StoryReq extends CommonRequests {

    async getAll(): Promise<Story[]> {
        return (await super.getAll()).map(item => new Story(item))
    }

    async getOneByPk(pk: any): Promise<Story> {
        return new Story(await super.getOneByPk(pk))
    }

    async create(story: Story): Promise<Story> {
        return new Story(await super.create(story))
    }

    async update(story: Story): Promise<Story> {
        return new Story(await super.update(story.storyId, story))
    }

}
