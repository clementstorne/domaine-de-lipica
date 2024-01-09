import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice.js.js";
import eventReducer from "./eventSlice.js";

const reducer = {
  auth: authReducer,
  events: eventReducer,
};

export default configureStore({
  reducer,
  devTools: true,
});
