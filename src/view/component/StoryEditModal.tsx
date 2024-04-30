import React, {useCallback} from 'react';
import './StoryEditModal.scss'
import {Story, storyReq} from "../../service/story/story";
import cn from "classnames";
import Modal from "react-modal";

type StoryViewProps = {
    content: Story | any,
    setContent: Function,
    isEdit: boolean,
    setIsEdit: Function,
    refresh: Function,
}

const StoryKeys = ["title", "place", "content"]

function StoryEditModal({content, setContent, isEdit, setIsEdit, refresh}: StoryViewProps) {

    const onCloseModal = useCallback(() => {
        setIsEdit(false);
    }, [setIsEdit]);

    const onSave = useCallback(async () => {
        const result = await storyReq.update(content);
        console.log("SAVE", content, result);
        setIsEdit(false);
        refresh();
    }, [content, setIsEdit, refresh]);

    const onChangeContent = useCallback((e: any) => {
        const {id, value} = e.target;
        setContent((prev: any) => ({...prev, [id]: value}));
    }, [setContent])

    return (
        <Modal isOpen={isEdit}
               onRequestClose={() => setIsEdit(false)}
               ariaHideApp={false}
               className={cn("story-edit-modal")}
               style={{ overlay: { zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' } }}>
            {StoryKeys.map((key) => <div className={cn("story-edit-modal-row")} key={`input_${key}`}>
                <label htmlFor={key}>
                    <div className={cn(`story-edit-modal-row-label`)}>{key}</div>
                    <input className={cn("story-edit-modal-row-input")} id={key} value={content[key]} onChange={onChangeContent}/>
                </label>
            </div>)}
            <div className={cn("story-edit-modal-button-row")}>
                <button className={cn("story-edit-modal-button")} onClick={onCloseModal}>Cancel</button>
                <button className={cn("story-edit-modal-button")} onClick={onSave}>Save</button>
            </div>
        </Modal>

    );
}

export default StoryEditModal;
