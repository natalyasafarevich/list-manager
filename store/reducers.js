import {combineReducers} from 'redux';
import {DataUserReducer} from './data-user/reducer';
import {DataBoardReducer} from './board/reducer';

export default combineReducers({
  userdata: DataUserReducer,
  boards: DataBoardReducer,
});
