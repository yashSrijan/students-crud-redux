import studentReducer from './studentReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    studentReducer : studentReducer
})

export default rootReducer;