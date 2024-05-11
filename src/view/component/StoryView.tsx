import React, {useCallback, useContext} from 'react';
import './StoryView.scss'
import {Story, storyReq} from "../../service/story/story";
import cn from "classnames";
import { MdEdit, MdDelete } from "react-icons/md";
import {StoryEditContext} from "../page/Main";

type StoryViewProps = {
    story: Story | any,
    refresh: Function,
}

const StoryKeys = ["title", "place", "content"]

function StoryView({story, refresh}: StoryViewProps) {

    const {setEditingStory} = useContext(StoryEditContext);

    const onEdit = useCallback(() => {
        setEditingStory(story)
    }, [story, setEditingStory]);

    const onDelete = useCallback(async () => {
        const response = await storyReq.delete(story.id)
        if (response.data.result) {
            refresh(true)
        }
    }, [refresh, story]);

    if (!story) return null

    return (
        <div className={cn("story-body")}>
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
