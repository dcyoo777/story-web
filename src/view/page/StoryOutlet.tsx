import React, {useCallback, useMemo} from 'react';
import {Outlet} from "react-router-dom";
import {Story, storyReq} from "../../server/story";

function StoryOutlet() {

    const props = useMemo(() => [
        { key: 'storyId', label: 'ID', type: 'number' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'content', label: 'Content', type: 'textarea' },
        { key: 'createdAt', label: 'Created At', type: 'datetime' },
        { key: 'updatedAt', label: 'Updated At', type: 'datetime' },
    ], [])

    const getAll = useCallback(async() => await storyReq.getAll(), [])
    const getOneByPk = useCallback(async(pk: any) => await storyReq.getOneByPk(pk), [])
    const createItem = useCallback(async(item: any) => {
        const story = Story.makeStory(item);
        if (!story) { return }
        return await storyReq.create(story)
    }, [])
    const updateItem = useCallback(async(pk: any, item: any) => {
        const story = Story.makeStory(item);
        if (!story) { return }
        return await storyReq.update(story)
    }, [])
    const deleteItem = useCallback(async(pk: any) => await storyReq.delete(pk), [])

    return (
        <Outlet context={{props, getAll, getOneByPk, createItem, updateItem, deleteItem}} />
    );
}

export default StoryOutlet;
