import React, {useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {setAppUser} from "../../redux/appUser";
import './Entrance.scss'
import cn from "classnames";
import AppUser, {appUserReq} from "../../service/appUser/appUser";

function Entrance() {

    const dispatch = useDispatch()

    const [name, setName] = useState<string>('')

    const onEnter = useCallback(async () => {
        const response = await appUserReq.getAll({
            name,
        })
        if (response.length === 0) {
            await appUserReq.create(new AppUser({
                name,
                bio: '',
                image: '',
            }))
        } else {
            dispatch(setAppUser({...response[0]}))
        }
    }, [dispatch, name])

    return (
        <div id={'Entrance'}>
            <h2>Welcome to Story</h2>
            <label className={'name'} htmlFor={'appUserNameInput'}>
                <span className={'name-label'}>Name</span>
                <input id={'appUserNameInput'} className={cn("name-input")} value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <button className={cn("enter-button")} onClick={onEnter}>Enter</button>
        </div>
    );
}

export default Entrance;
