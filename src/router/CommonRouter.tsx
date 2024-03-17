import React, {JSX} from 'react';
import {Route} from 'react-router-dom'
import List from "../view/template/List";
import Detail from "../view/template/Detail";
import Create from "../view/template/Create";
import Update from "../view/template/Update";

function CommonRouter({name, outlet}: {name: string, outlet: React.ReactNode}) {
    return (
        <Route path={`${name}/`} element={outlet}>
            <Route path="" index element={<List />} />
            <Route path=":storyId" element={<Detail />} />
            <Route path="create" element={<Create />} />
            <Route path="update" element={<Update />} />
        </Route>
    );
}

export default CommonRouter;
