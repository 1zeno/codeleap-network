import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        data: null,
        error: null,
    },
    reducers: {
        started (state) {
            state.loading = true;
        },
        success (state, action) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        error (state, action) {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        }
    },
})

export const { started, success, error } = slice.actions;

export default slice.reducer;