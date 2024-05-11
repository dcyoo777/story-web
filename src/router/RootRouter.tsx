import React from 'react';
import {Route, Routes} from 'react-router-dom'
import Main from "../view/page/Main";
import Layout from "../view/component/Layout";
import StoryContext from "../service/story/storyContext";
import List from "../view/template/List";
import Detail from "../view/template/Detail";
import Create from "../view/template/Create";
import Edit from "../view/template/Edit";
import Item from "../view/template/Item";
import AppUserContext from "../service/appUser/appUserContext";
import DayPage from "../view/page/DayPage";
import WeekPage from "../view/page/WeekPage";
import {useSelector} from "react-redux";
import {RootState} from "../redux";
import Entrance from "../view/page/Entrance";

function RootRouter() {

    const appUser = useSelector((state: RootState) => state.appUser);

    console.log(appUser)

    return (
        <Routes>
            {!appUser.name && <Route path="*" element={<Entrance />} />}
            {appUser.name && <>
                <Route path="admin/" element={<Layout />} >
                    <Route path={`story/`} element={<AppUserContext />}>
                        <Route path="" index element={<List />} />
                        <Route path=":id/" element={<Item />}>
                            <Route index element={<Detail />} />
                            <Route path="edit" element={<Edit />} />
                        </Route>
                        <Route path="create" element={<Create />} />
                    </Route>
                    <Route path={`user/`} element={<AppUserContext />}>
                        <Route path="" index element={<List />} />
                        <Route path=":userId/" element={<Item />}>
                            <Route index element={<Detail />} />
                            <Route path="edit" element={<Edit />} />
                        </Route>
                        <Route path="create" element={<Create />} />
                    </Route>
                </Route>
                <Route path="*" element={<Main />} >
                    <Route index element={<DayPage />}/>
                    <Route path="day" element={<DayPage />}/>
                    <Route path="week" element={<WeekPage />}/>
                </Route>
            </>}
        </Routes>
    );
}

export default RootRouter;
