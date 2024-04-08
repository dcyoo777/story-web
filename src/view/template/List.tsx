import React, {useEffect, useState} from 'react';
import {useOutletContext} from "react-router-dom";
import ListTemplate from "../component-library/template/ListTemplate";

function List() {

    // @ts-ignore
    const {getAll} = useOutletContext();

    const [items, setItems] = useState([]);

    useEffect(() => {
        getAll().then(setItems)
    }, [getAll]);

    console.log(items)

    return (
        <div>
            <ListTemplate
                id="storyId"
                data={items}
                headers={[
                    {key: 'storyId', label: 'ID', type: 'number'},
                    {key: 'title', label: 'Title'},
                    {key: 'content', label: 'Content'},
                    {key: 'createdAt', label: 'Created at', type: 'datetime'},
                    {key: 'updatedAt', label: 'Updated at', type: 'datetime'},
                ]}
                useCreate ={true}
                useDetail ={true}
                // maxCount = 0,
                // limit = 10,
                title={"List"}
                hasFilter={false}
                setIsFilterOpen={() => {}}
            />
        </div>
    );
}

export default List;
