import { combineReducers } from 'redux';
import {taskApi} from "./Api/Api.ts";

const rootReducer = combineReducers({
  [taskApi.reducerPath]: taskApi.reducer,
});

export default rootReducer;