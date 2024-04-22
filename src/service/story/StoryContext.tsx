import React, {useCallback, useMemo} from 'react';
import {Outlet} from "react-router-dom";
import {Story, storyReq} from "./story";

export type TableDataColumn = {
    key: string,
    label: string,
    type: string,
    required?: boolean,
}

export type TableData = {
    props: {
        path: string,
        priKey: string,
        columns: TableDataColumn[]
    },
    getAll: Function,
    getOneByPk: Function,
    createItem: Function,
    updateItem: Function,
    deleteItem: Function,
}

function StoryContext() {

    const props = useMemo(() => ({
        path: "story",
        priKey: "storyId",
        columns: [
            { key: 'storyId', label: 'ID', type: 'number' },
            { key: 'title', label: 'Title', type: 'text', required: true },
            { key: 'content', label: 'Content', type: 'textarea', required: true },
            { key: 'createdAt', label: 'Created At', type: 'datetime' },
            { key: 'updatedAt', label: 'Updated At', type: 'datetime' },
        ],
        initialContent: {
            title: "",
            content: "",
        }
    }), [])

    const getAll = useCallback(async() => await storyReq.getAll({
        startFrom: "2024-04-09 00:00:00",
        startTo: "2024-04-09 12:00:00",
    }), [])
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

export default StoryContext;
