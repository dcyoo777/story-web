import React, {JSX} from 'react';
import {Route} from 'react-router-dom'
import List from "../view/template/List";
import Detail from "../view/template/Detail";
import Create from "../view/template/Create";
import Edit from "../view/template/Edit";

function CommonRouter({name, outlet}: {name: string, outlet: React.ReactNode}) {
    return (
        <Route path={`${name}/`} element={outlet}>
            <Route path="" index element={<List />} />
            <Route path=":id" element={<Detail />} />
            <Route path="create" element={<Create />} />
            <Route path="update" element={<Edit />} />
        </Route>
    );
}

export default CommonRouter;
