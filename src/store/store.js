import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "../store/Auth";
const store = configureStore({
  reducer: {
    Authreducer,
  },
});

export default store;
