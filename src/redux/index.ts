import {Action, configureStore} from "@reduxjs/toolkit";
import appUserSlice from "./appUser";

const store = configureStore({
    reducer: {
        appUser: appUserSlice.reducer,
    },
});

store.subscribe(() => {
    console.log(store.getState());
});

export const storeDispatch = (action: Action) => store.dispatch(action);
export default store;
export type RootState = ReturnType<typeof store.getState>;
