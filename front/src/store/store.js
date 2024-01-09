import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice.js.js";
import eventReducer from "./eventSlice.js";
import partnerReducer from "./partnerSlice.js";

const reducer = {
  auth: authReducer,
  events: eventReducer,
  partners: partnerReducer,
};

export default configureStore({
  reducer,
  devTools: true,
});
