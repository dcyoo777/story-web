import React, {useCallback, useEffect} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import {TableData} from "../../service/story/StoryContext";
import {EditContent} from "../../hook/useEditContent";
import DataView from "../component-library/data/DataView";
import ButtonWrapper from "../component-library/ButtonWrapper";
import Button from "../component-library/button/Button";

function Edit() {

    const navigate = useNavigate();
    const {props, updateItem, content, setContent, isEdit, setIsEdit}: TableData & EditContent = useOutletContext();

    const onCancel = useCallback(() => navigate(`/${props.path}/${content[props.priKey]}`), [navigate, props, content])
    const onEdit = useCallback(async () => {
        const result = await updateItem(props.priKey, content)
        if (result){
            alert("Edit Success")
            navigate(`/${props.path}/${content[props.priKey]}`)
        }
    }, [navigate, props, content, updateItem])

    useEffect(() => {
        if (!isEdit) {
            setIsEdit(true)
        }
    }, [isEdit, setIsEdit])

    return (
        <>
            <DataView
                data={content}
                setData={setContent}
                headers={props.columns}
                title={'Edit'}
                isEditable={isEdit}
            />
            <ButtonWrapper>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onEdit}>Edit</Button>
            </ButtonWrapper>
        </>
    );
}

export default Edit;
