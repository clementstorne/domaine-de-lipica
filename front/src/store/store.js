import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice.js.js";
import carouselReducer from "./carouselSlice.js";
import eventReducer from "./eventSlice.js";
import partnerReducer from "./partnerSlice.js";
import stableReducer from "./stableSlice.js";

const reducer = {
  auth: authReducer,
  events: eventReducer,
  partners: partnerReducer,
  stables: stableReducer,
  carousel: carouselReducer,
};

export default configureStore({
  reducer,
  devTools: true,
});
