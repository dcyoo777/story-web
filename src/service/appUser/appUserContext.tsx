import React, {useCallback, useMemo} from 'react';
import {Outlet} from "react-router-dom";
import AppUser, {appUserReq} from "./appUser";

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

function AppUserContext() {

    const props = useMemo(() => ({
        path: "user",
        priKey: "userId",
        columns: [
            { key: 'id', label: 'ID', type: 'number' },
            { key: 'name', label: 'Name', type: 'text', required: true },
            { key: 'bio', label: 'Bio', type: 'textarea', required: true },
            { key: 'image', label: 'Image', type: 'image' },
            { key: 'createdAt', label: 'Created At', type: 'datetime' },
            { key: 'updatedAt', label: 'Updated At', type: 'datetime' },
        ],
        initialContent: {
            userName: "",
            userBio: "",
        }
    }), [])

    const getAll = useCallback(async() => await appUserReq.getAll(), [])
    const getOneByPk = useCallback(async(pk: any) => await appUserReq.getOneByPk(pk), [])
    const createItem = useCallback(async(item: any) => {
        const appUser = AppUser.makeAppUser(item);
        if (!appUser) { return }
        return await appUserReq.create(appUser)
    }, [])
    const updateItem = useCallback(async(pk: any, item: any) => {
        const appUser = AppUser.makeAppUser(item);
        if (!appUser) { return }
        return await appUserReq.update(appUser)
    }, [])
    const deleteItem = useCallback(async(pk: any) => await appUserReq.delete(pk), [])

    return (
        <Outlet context={{props, getAll, getOneByPk, createItem, updateItem, deleteItem}} />
    );
}

export default AppUserContext;
