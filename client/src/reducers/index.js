import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import streamreducer from "./streamReducer";
export default combineReducers({
  auth: authReducer,
  form: formReducer,
  streams: streamreducer,
});
