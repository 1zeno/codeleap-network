import {started, success, error} from '../redux/login';

export const signUp = (username, language) => async (dispatch) => {
    try {
        dispatch(started());
        window.localStorage.setItem(
            'user',
            JSON.stringify({username, language}),
        );
        dispatch(success({username}));
    } catch (err) {
        dispatch(error(err.message))
    }
}

export const login = () => async (dispatch) => {
    try {
        dispatch(started());
        const data = window.localStorage.getItem('user');
        dispatch(success(JSON.parse(data)));
    } catch (err) {
        dispatch(error(err.message))
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch(started());
        window.localStorage.removeItem('user');
        dispatch(success(null));
    } catch (err) {
        dispatch(error(err.message))
    }
}

export const changeLanguage = (language) => async (dispatch, getState) => {
    try {
        dispatch(started());
        const state = getState();
        const user = state.login.data;
        const newUser = {...user, language};
        window.localStorage.setItem(
            'user',
            JSON.stringify(newUser),
        );
        dispatch(success(newUser));
    } catch (err) {
        dispatch(error(err.message))
    }
}

