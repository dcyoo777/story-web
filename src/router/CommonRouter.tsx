import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Main from "../view/page/Main";
import Layout from "../view/component/Layout";
import Story from "../view/page/Story";

function RootRouter() {
    return (
        <Routes>
            <Route path="" index element={<Main />} />
            <Route path="*" element={<Layout />} >
                <Route path="story" index element={<Story />} />
            </Route>
        </Routes>
    );
}

export default RootRouter;
