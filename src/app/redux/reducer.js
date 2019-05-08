import { combineReducers } from 'redux';

import itemPicker from 'app/redux/itemPicker/reducer';
import viewer from 'app/redux/viewer/reducer';
import graphic from 'app/redux/graphic/reducer';


export default combineReducers({
  itemPicker,
  viewer,
  graphic,
});
