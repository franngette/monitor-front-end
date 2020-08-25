import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import mqttReducer from './reducers/mqttReducer';

const store = createStore(
    mqttReducer, 
    applyMiddleware(thunk)
    );

export default store;