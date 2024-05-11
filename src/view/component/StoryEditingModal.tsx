import React, {useCallback, useContext, useEffect, useState} from 'react';
import './StoryEditModal.scss'
import {storyReq} from "../../service/story/story";
import cn from "classnames";
import Modal from "react-modal";
import {StoryEditContext} from "../page/Main";

const StoryKeys = ["title", "place", "content"]

function StoryEditingModal() {

    const {editingStory, setEditingStory, refresh} = useContext(StoryEditContext);
    const [content, setContent] = useState<any | undefined>();

    const [isShowModal, setIsShowModal] = useState<boolean>(false);

    const onCloseModal = useCallback(() => {
        setEditingStory(undefined)
    }, [setEditingStory]);

    const onSave = useCallback(async () => {
        if(content) {
            const result = await storyReq.update(content);
            refresh();
            onCloseModal()
        }
    }, [content, editingStory, onCloseModal, refresh]);

    const onChangeContent = useCallback((e: any) => {
        const {id, value} = e.target;
        setContent((prev: any) => ({...prev, [id]: value}));
    }, [setContent])

    useEffect(() => {
        if (editingStory === undefined) {
            setIsShowModal(false)
        } else {
            setIsShowModal(true)
            setContent(editingStory)
        }
    }, [editingStory])

    return (
        <Modal isOpen={isShowModal}
               onRequestClose={onCloseModal}
               ariaHideApp={false}
               className={cn("story-edit-modal")}
               style={{ overlay: { zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' } }}>
            {content !== undefined && StoryKeys.map((key) => <div className={cn("story-edit-modal-row")} key={`input_${key}`}>
                <label htmlFor={key}>
                    <div className={cn(`story-edit-modal-row-label`)}>{key}</div>
                    <input className={cn("story-edit-modal-row-input")} id={key} value={content[key]}
                           onChange={onChangeContent}/>
                </label>
            </div>)}
            <div className={cn("story-edit-modal-button-row")}>
                <button className={cn("story-edit-modal-button")} onClick={onCloseModal}>Cancel</button>
                <button className={cn("story-edit-modal-button")} onClick={onSave}>Save</button>
            </div>
        </Modal>

    );
}

export default StoryEditingModal;
