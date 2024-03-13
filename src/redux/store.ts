import { configureStore, combineReducers } from '@reduxjs/toolkit';
import timerSlice from './slices/timer';

const rootReducer = combineReducers({
    timer: timerSlice
});

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;