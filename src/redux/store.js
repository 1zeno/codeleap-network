import { combineReducers, configureStore } from '@reduxjs/toolkit';
import login from './login';
import home from './home';

const reducer = combineReducers({ home, login });

const store = configureStore({ reducer });

export default store;


