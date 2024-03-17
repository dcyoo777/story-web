import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Main from "../view/page/Main";

function Router() {
    return (
        <Routes>
            <Route path={""} index element={<Main />} />
        </Routes>
    );
}

export default Router;
