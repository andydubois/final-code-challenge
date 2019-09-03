import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// Your saga should listen for the action type of `GET_ZOO_ANIMALS`
function* rootSaga() {
    // YOUR CODE HERE
    yield takeEvery("GET_ZOO_ANIMALS", getAnimals)
    yield takeEvery("ADD_ANIMAL", addAnimal)
}


function* getAnimals(action) {
    console.log("client side animals GET", action);
    try {
        let response = yield axios.get("/zoo");
        console.log('saga response', response.data);
        yield put ({
            type: "SET_ZOO_ANIMALS",
            payload: response.data
        })
    } catch (error) {
        console.log("error in the animals GET client side", error);
    }
}

function* addAnimal(action) {
    console.log("client side animal POST, adding animal", action.payload);
    try {
        yield axios.post("/zoo/add", action.payload);
        yield put ({
            type: "GET_ZOO_ANIMALS"
        });
    } catch(error) {
        console.log('error in POST', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store class and number of unique animals in that class
const zooAnimals = (state = [], action) => {
    switch (action.type) {
        case 'SET_ZOO_ANIMALS':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        zooAnimals,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();
