import { combineReducers } from "redux-immutable";
import { reducer as loginReducer } from "../pages/login-page/store";
import {reducer as listReducer} from '../pages/list-page/store'

const reducers = combineReducers({
  login: loginReducer,
  list:listReducer
});

export default reducers;
