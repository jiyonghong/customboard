import { combineReducers } from 'redux';

import itemPicker from 'app/redux/itemPicker/reducer';
import viewer from 'app/redux/viewer/reducer';


export default combineReducers({
  itemPicker,
  viewer,
});
