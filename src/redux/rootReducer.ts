import { combineReducers } from "redux";
import listReducer from "./slices/listSlice";

const rootReducer = combineReducers({
  list: listReducer,
});

export default rootReducer;
