import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    name: ''
}

const appUserSlice = createSlice({
    name: 'appUser',
    initialState,
    reducers: {
        setAppUser(state, action) {
            Object.keys(action.payload).forEach(key => {
                // @ts-ignore
                state[key] = action.payload[key];
            });
        },
    },

});

export const {setAppUser} = appUserSlice.actions;

export default appUserSlice;
