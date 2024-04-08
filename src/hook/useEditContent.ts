import { useEffect, useState } from 'react';

export type EditContent = {
    content: any,
    setContent: Function,
    isEdit: boolean,
    setIsEdit: Function
}

const useEditContent = (initialContent: any, isCreate = false): EditContent => {
    const [content, setContent] = useState(initialContent);
    const [isEdit, setIsEdit] = useState(isCreate);
    useEffect(() => {
        if (!isEdit) {
            setContent(content);
        }
    }, [content, isEdit]);

    return {
        content,
        setContent,
        isEdit,
        setIsEdit,
    };
};

export default useEditContent;
