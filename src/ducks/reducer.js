import {combineReducers} from 'redux';
import drivers_reducer from './drivers_reducer';

const reducer = combineReducers({
    drivers: drivers_reducer
})

export default reducer;