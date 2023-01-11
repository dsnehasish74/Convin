import { combineReducers } from "redux";
import { AuthReducer } from "./AuthReducer";
const reducers = combineReducers({
  userId: AuthReducer,
});
export default reducers;
