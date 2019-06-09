import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import {logger} from 'redux-logger';

import rootReducer from './_reducers/rootReducer';
import { saveState, loadState } from './_helpers/localStorage';

//this function is executed everytime a reload happens on the app
let persistedState = loadState();
const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(logger)
);

store.subscribe(() => {
    //everytime the state of the application changes, then save it to sessionStorage
    saveState(store.getState());
});

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>
    
    , document.getElementById('root')
);
