import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Main from "../view/page/Main";
import Layout from "../view/component/Layout";
import CommonRouter from "./CommonRouter";
import StoryContext from "../service/story/StoryContext";
import List from "../view/template/List";
import Detail from "../view/template/Detail";
import Create from "../view/template/Create";
import Edit from "../view/template/Edit";
import Item from "../view/template/Item";
import UserContext from "../service/user/UserContext";

function RootRouter() {
    return (
        <Routes>
            <Route path="" index element={<Main />} />
            <Route path="admin/" element={<Layout />} >
                <Route path={`story/`} element={<StoryContext />}>
                    <Route path="" index element={<List />} />
                    <Route path=":storyId/" element={<Item />}>
                        <Route index element={<Detail />} />
                        <Route path="edit" element={<Edit />} />
                    </Route>
                    <Route path="create" element={<Create />} />
                </Route>
                <Route path={`user/`} element={<UserContext />}>
                    <Route path="" index element={<List />} />
                    <Route path=":userId/" element={<Item />}>
                        <Route index element={<Detail />} />
                        <Route path="edit" element={<Edit />} />
                    </Route>
                    <Route path="create" element={<Create />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default RootRouter;
