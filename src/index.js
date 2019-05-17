import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
// import { logger } from 'redux-logger';
import thunkMiddlewarer from 'redux-thunk';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { searchRobots, requestRobots } from './reducers';
import './index.css';
import 'tachyons';

// This is the front-end part with only REDUX !!

const logger = createLogger();
const rootReducer = combineReducers({ searchRobots, requestRobots });
// for "createLogger", import "createLogger" and do it in this way OR...simply import {logger} and no need to declare any const or var named 'logger'.
const store = createStore(rootReducer, applyMiddleware(thunkMiddlewarer, logger));
// you don't need to use console.log to debug if you use Middleware.

ReactDOM.render(
	<Provider store={store}>
		{/* {console.log(store)} */}
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
