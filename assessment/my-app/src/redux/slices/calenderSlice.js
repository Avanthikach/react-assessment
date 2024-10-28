
import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    events: [],
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        addCalendarEvent: (state, action) => {
            state.events.push(action.payload);
        },
    },
});

export const { addCalendarEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
