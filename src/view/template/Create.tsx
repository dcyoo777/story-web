import React, {useCallback, useMemo} from 'react';
import CreateTemplate from "../component-library/template/CreateTemplate";
import {useNavigate, useOutletContext} from "react-router-dom";
import useEditContent from "../../hook/useEditContent";

const initialContent = {
    title: '',
    content: '',
}

function Create() {

    const navigate = useNavigate()

    // @ts-ignore
    const {props, createItem} = useOutletContext();

    const { content, setContent } = useEditContent(
        initialContent,
        true,
    );

    const onCreate = useCallback(async () => {
        console.log(content)
        const result = createItem(content)
        if (result) {
            alert("Create Success")
            navigate(`/${props.path}`)
        }
    }, [props, content, createItem, navigate])

    const isPossibleCreate = useMemo(() => {
        return Object.keys(content).reduce((result, key) => {
            return result && Boolean(content[key]);
        }, true);
    }, [content]);

    return (
        <div>
            <CreateTemplate
                data={content}
                setData={setContent}
                onCreate={onCreate}
                headers={[
                    {key: 'title', label: 'Title'},
                    {key: 'content', label: 'Content'},
                ]}
                isPossibleCreate={isPossibleCreate}
                title={'Create'}
            />
        </div>
    );
}

export default Create;
