import React, {useEffect, useState} from 'react';
import {useOutletContext} from "react-router-dom";

function List() {

    // @ts-ignore
    const {getAll} = useOutletContext();

    const [items, setItems] = useState();

    useEffect(() => {
        getAll().then(setItems)
    }, [getAll]);

    console.log(items)

    return (
        <div></div>
    );
}

export default List;
