import React, {useCallback} from 'react';
import './StoryView.scss'
import {Story} from "../../service/story/story";
import cn from "classnames";
import useEditContent from "../../hook/useEditContent";
import StoryEditModal from "./StoryEditModal";

type StoryViewProps = {
    story: Story | any,
    refresh: Function,
}

const StoryKeys = ["title", "place", "content"]

function StoryView({story, refresh}: StoryViewProps) {

    const {content, setContent, isEdit, setIsEdit} = useEditContent(story);

    const onEdit = useCallback(() => {
        setIsEdit(true);
    }, [setIsEdit]);

    return (
        <div className={cn("story-body")}>
            <StoryEditModal content={content} setContent={setContent} isEdit={isEdit} setIsEdit={setIsEdit} refresh={refresh}/>
            <button onClick={onEdit} className={cn("edit-button")}>Edit</button>
            {StoryKeys.map((key) => <div className={cn(`story-body-${key}`)} key={`r_${key}`}>{story[key]}</div>)}
        </div>

    );
}

export default StoryView;
