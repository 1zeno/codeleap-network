import {
    fetchStarted, fetchSuccess, fetchError,
    createStarted, createSuccess, createError,
    editStarted, editSuccess, editError,
    deleteStarted, deleteSuccess, deleteError,
} from '../redux/home';
import {
    getPosts, createPost as createPostAPI,
    editPost as editPostAPI,
    deletePost as deletePostAPI,
} from "../resources/api";

export const fetchPosts = () => async (dispatch) => {
    try {
        dispatch(fetchStarted());
        const data = await getPosts();
        dispatch(fetchSuccess(data));
    } catch (error) {
        dispatch(fetchError(error.message))
    }
}

export const fetchNextPosts = () => async (dispatch, getState) => {
    try {
        dispatch(fetchStarted());
        const state = getState();
        const data = await getPosts(state.home.fetch.data.next);
        data.results = [...state.home.fetch.data.results, ...data.results];
        dispatch(fetchSuccess(data));
    } catch (error) {
        dispatch(fetchError(error.message))
    }
}

export const createPost = (postData) => async (dispatch) => {
    try {
        dispatch(createStarted());
        await createPostAPI(postData);
        dispatch(fetchPosts());
        dispatch(createSuccess());
    } catch (error) {
        dispatch(createError(error.message))
    }
}

export const editPost = (id, postData) => async (dispatch) => {
    try {
        dispatch(editStarted());
        await editPostAPI(id, postData);
        dispatch(fetchPosts());
        dispatch(editSuccess());
    } catch (error) {
        dispatch(editError(error.message))
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        dispatch(deleteStarted());
        await deletePostAPI(id);
        dispatch(fetchPosts());
        dispatch(deleteSuccess());
    } catch (error) {
        dispatch(deleteError(error.message))
    }
}