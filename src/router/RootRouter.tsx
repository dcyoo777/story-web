import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Main from "../view/page/Main";
import Layout from "../view/component/Layout";
import CommonRouter from "./CommonRouter";
import StoryOutlet from "../view/page/StoryOutlet";
import List from "../view/template/List";
import Detail from "../view/template/Detail";
import Create from "../view/template/Create";
import Edit from "../view/template/Edit";
import Item from "../view/template/Item";

function RootRouter() {
    return (
        <Routes>
            <Route path="" index element={<Main />} />
            <Route path="*" element={<Layout />} >
                <Route path={`story/`} element={<StoryOutlet />}>
                    <Route path="" index element={<List />} />
                    <Route path=":storyId/" element={<Item />}>
                        <Route index element={<Detail />} />
                        <Route path="edit" element={<Edit />} />
                    </Route>
                    <Route path="create" element={<Create />} />

                </Route>
                {/*<CommonRouter name="story" outlet={<StoryOutlet />}/>*/}
            </Route>
        </Routes>
    );
}

export default RootRouter;
