import {combineReducers} from 'redux';
import {DataUserReducer} from './data-user/reducer';
import {DataBoardReducer} from './board/reducer';
import {ColumnReducer} from './colunm-info/reducer';
import {ColumnSettingReducer} from './column-setting/reducer';
import {CardSettingReducer} from './card-setting/reducer';
import {MarkersReducer} from './card-sidebar/reducer';
import {CheckListsReducer} from './check-lists/reducer';

export default combineReducers({
  userdata: DataUserReducer,
  boards: DataBoardReducer,
  column: ColumnReducer,
  cl_setting: ColumnSettingReducer,
  card_setting: CardSettingReducer,
  markers: MarkersReducer,
  check_lists: CheckListsReducer,
});
