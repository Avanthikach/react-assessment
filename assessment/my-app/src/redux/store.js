import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slices/dataSlice';
import calendarReducer from './slices/calenderSlice'; // Ensure this path is correct

export const store = configureStore({
    reducer: {
        data: dataReducer,
        calendar: calendarReducer,
    },
});

export default store;
