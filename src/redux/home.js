import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'posts',
    initialState: {
        fetch: {
            loading: false,
            data: null,
            error: null,
        },
        create: {
            loading: false,
            error: null, 
        },
        edit: {
            loading: false,
            error: null, 
        },
        delete: {
            loading: false,
            error: null, 
        },
    },
    reducers: {
        fetchStarted (state) {
            state.fetch.loading = true;
        },
        fetchSuccess (state, action) {
            state.fetch.loading = false;
            state.fetch.data = action.payload;
            state.fetch.error = null;
        },
        fetchError (state, action) {
            state.fetch.loading = false;
            state.fetch.data = null;
            state.fetch.error = action.payload;
        },
        createStarted (state) {
            state.create.loading = true;
        },
        createSuccess (state) {
            state.create.loading = false;
            state.create.error = null;
        },
        createError (state, action) {
            state.create.loading = false;
            state.create.error = action.payload;
        },
        editStarted (state) {
            state.edit.loading = true;
        },
        editSuccess (state) {
            state.edit.loading = false;
            state.edit.error = null;
        },
        editError (state, action) {
            state.edit.loading = false;
            state.edit.error = action.payload;
        },
        deleteStarted (state) {
            state.delete.loading = true;
        },
        deleteSuccess (state) {
            state.delete.loading = false;
            state.delete.error = null;
        },
        deleteError (state, action) {
            state.delete.loading = false;
            state.delete.error = action.payload;
        }
    },
})

export const {
    fetchStarted, fetchSuccess, fetchError,
    createStarted, createSuccess, createError,
    editStarted, editSuccess, editError,
    deleteStarted, deleteSuccess, deleteError,
} = slice.actions;

export default slice.reducer;