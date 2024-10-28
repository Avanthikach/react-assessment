// slices/dataSlice.ts
import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    items: [],
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateItem: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
    },
});

export const { setItems, addItem, removeItem, updateItem } = dataSlice.actions;
export default dataSlice.reducer;
