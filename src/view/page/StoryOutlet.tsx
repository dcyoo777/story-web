import React, {useCallback, useMemo} from 'react';
import {Outlet} from "react-router-dom";
import {Story, storyReq, StoryReq} from "../../server/story";

Story.propTypes = {

};

function Story() {

    const props = useMemo(() => [
        { key: 'storyId', label: 'ID', type: 'number' },
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'content', label: 'Content', type: 'textarea' },
        { key: 'createdAt', label: 'Created At', type: 'datetime' },
        { key: 'updatedAt', label: 'Updated At', type: 'datetime' },
    ], [])

    const getAll = useCallback(async() => await storyReq.getAll(), [])
    const getOneByPk = useCallback(async(pk: any) => await storyReq.getOneByPk(pk), [])
    const createItem = useCallback(async(item: any) => await storyReq.create(new Story(item)), [])
    const updateItem = useCallback(async(pk: any, item: any) => await storyReq.update(pk, new Story(item)), [])
    const deleteItem = useCallback(async(pk: any) => await storyReq.delete(pk), [])

    return (
        <Outlet context={{props, getAll, getOneByPk, createItem, updateItem, deleteItem}} />
    );
}

export default Story;
