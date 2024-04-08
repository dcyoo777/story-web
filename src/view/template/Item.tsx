import React, {Suspense, useEffect, useMemo} from 'react';
import {Outlet, useOutletContext, useParams} from "react-router-dom";
import useEditContent from "../../hook/useEditContent";
import {TableData} from "../page/StoryOutlet";

// Detail.prototype = {
//     name: string
// }

function Detail() {

    const outletContext: TableData = useOutletContext();
    const {props, getOneByPk} = outletContext;
    const params = useParams()
    const primaryKey = useMemo(() => params[props.priKey], [params, props])

    const editContent = useEditContent({})

    useEffect(() => {
        getOneByPk(primaryKey).then(editContent.setContent)
    }, [getOneByPk, primaryKey, editContent.setContent]);

    if (!editContent?.content) {
        return <div />
    }

    return (
        <Suspense fallback={<div />}>
            <Outlet context={{...outletContext, ...editContent}}/>
        </Suspense>
    );
}

export default Detail;
