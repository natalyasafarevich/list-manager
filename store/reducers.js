import {combineReducers} from 'redux';
import {DataUserReducer} from './data-user/reducer';

export default combineReducers({
  userdata: DataUserReducer,
});
