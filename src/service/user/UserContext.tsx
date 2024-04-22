import React, {useCallback, useMemo} from 'react';
import {Outlet} from "react-router-dom";
import {User, userReq} from "./user";

export type TableDataColumn = {
    key: string,
    label: string,
    type: string,
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

function UserContext() {

    const props = useMemo(() => ({
        path: "user",
        priKey: "userId",
        columns: [
            { key: 'userId', label: 'ID', type: 'number' },
            { key: 'userName', label: 'Name', type: 'text', required: true },
            { key: 'userBio', label: 'Bio', type: 'textarea', required: true },
            { key: 'userImage', label: 'Image', type: 'image' },
            { key: 'createdAt', label: 'Created At', type: 'datetime' },
            { key: 'updatedAt', label: 'Updated At', type: 'datetime' },
        ],
        initialContent: {
            userName: "",
            userBio: "",
        }
    }), [])

    const getAll = useCallback(async() => await userReq.getAll(), [])
    const getOneByPk = useCallback(async(pk: any) => await userReq.getOneByPk(pk), [])
    const createItem = useCallback(async(item: any) => {
        const story = User.makeUser(item);
        if (!story) { return }
        return await userReq.create(story)
    }, [])
    const updateItem = useCallback(async(pk: any, item: any) => {
        const story = User.makeUser(item);
        if (!story) { return }
        return await userReq.update(story)
    }, [])
    const deleteItem = useCallback(async(pk: any) => await userReq.delete(pk), [])

    return (
        <Outlet context={{props, getAll, getOneByPk, createItem, updateItem, deleteItem}} />
    );
}

export default UserContext;
