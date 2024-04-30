import React, {useCallback} from 'react';
import './StoryView.scss'
import {Story, storyReq} from "../../service/story/story";
import cn from "classnames";
import useEditContent from "../../hook/useEditContent";
import StoryEditModal from "./StoryEditModal";
import { MdEdit, MdDelete } from "react-icons/md";

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

    const onDelete = useCallback(async () => {
        const response = await storyReq.delete(story.id)
        if (response.data.result) {
            refresh(true)
        }
    }, [refresh, story]);

    if (!story) return null

    return (
        <div className={cn("story-body")}>
            <StoryEditModal content={content} setContent={setContent} isEdit={isEdit} setIsEdit={setIsEdit} refresh={refresh}/>
            <button onClick={onEdit} className={cn("edit-button")}>
                <MdEdit fill={'grey'}/>
            </button>
            <button onClick={onDelete} className={cn("delete-button")}>
                <MdDelete fill={'pink'}/>
            </button>
            {StoryKeys.map((key) => <div className={cn(`story-body-${key}`)} key={`r_${key}`}>{story[key]}</div>)}
        </div>

    );
}

export default StoryView;
