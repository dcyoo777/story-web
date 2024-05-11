import React, {useCallback} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import DataView from "../component-library/data/DataView";
import ButtonWrapper from "../component-library/ButtonWrapper";
import Button from "../component-library/button/Button";
import {TableData} from "../../service/story/storyContext";
import {EditContent} from "../../hook/useEditContent";

function Detail() {

    const navigate = useNavigate();
    const {props, deleteItem, content}: TableData & EditContent = useOutletContext();

    const onToList = useCallback(() => navigate(`/${props.path}`), [navigate, props])
    const onUpdate = useCallback(() => navigate(`edit`), [navigate])
    const onDelete = useCallback(async () => {
        if (!content) {
            return
        }
        const result = await deleteItem(content[props.priKey])
        if (result){
            alert("Delete Success")
            navigate(`/${props.path}`)
        }
    }, [navigate, props, content, deleteItem])

    return (
        <>
            <DataView
                data={content}
                headers={props.columns}
                title={'Detail'}
            />
            <ButtonWrapper>
                <Button onClick={onToList}>To list</Button>
                <Button onClick={onUpdate}>Update</Button>
                <Button onClick={onDelete}>Delete</Button>
            </ButtonWrapper>
        </>
    );
}

export default Detail;
